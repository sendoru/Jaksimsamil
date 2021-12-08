const Profile = require("../../models/profile");
const mongoose = require("mongoose");
const getBJ = require("../../util/getBJ");
const Joi = require("joi");
const analyzeBJ = require("../../util/analyzeBJ");
const searchProblem = require("../../util/searchProblem");
const getUserTier = require("../../util/getUserTier");
const getUserRating = require("../../util/getUserRating");
const getTestInfo = require("../../util/getTestInfo");
const { ObjectId } = mongoose.Types;

exports.checkObjectId = (ctx, next) => {
  const { username } = ctx.request.body;
  if (!ObjectId.isValid(username)) {
    ctx.status = 400;
    return;
  }
  return next();
};
/*POST /api/profile/getprofile
{
  username: "username"
}
*/
exports.getProfile = async (ctx) => {
  try {
    const { username } = ctx.request.body;
    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    ctx.body = profile;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
POST /api/proflie/setprofile
{
    "username": "username",
    "userBJID": "userBJID",
    "friendList": [String],
}
 */
exports.setProfile = async (ctx) => {
  const schema = Joi.object()
    .keys({
      username: Joi.string(),
      userBJID: Joi.string(),
      //freindList: Joi.array().items(Joi.string()),
    })
    .unknown();
  console.log(ctx.request.body);
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    let profile = await Profile.findOneAndUpdate(
      { username: ctx.request.body.username },
      ctx.request.body,
      {
        new: true,
      }
    ).exec();

    if (!profile.testInfo) {
      profile = await Profile.findOneAndUpdate(
        { username: ctx.request.body.username },
        { testInfo: {div: 4, inProgress: false}},
        { new: true }
      ).exec();
    }

    if (!profile) {
      ctx.status = 404;
      return;
    }
    ctx.body = profile;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
PATCH /api/proflie/syncBJ
{
    username: 'userid'
}
 */
exports.syncBJ = async function (ctx) {
  const { username } = ctx.request.body;

  if (!username) {
    ctx.status = 401;
    return;
  }

  try {
    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    const BJID = await profile.getBJID();
    let newUserTier = await getUserTier.getUserTier(BJID);
    let newUserRating = await getUserRating.getUserRating(BJID);
    let BJdata = await getBJ.getBJ(BJID);
    let BJdata_date = await analyzeBJ.analyzeBJ(BJdata, BJID, newUserTier);
    const updateprofile = await Profile.findOneAndUpdate(
      { username: username },
      { userTier: newUserTier, userRating: newUserRating, solvedBJ: BJdata, solvedBJ_date: BJdata_date},
      { new: true }
    ).exec();
    ctx.body = updateprofile;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
PATCH /api/proflie/inittest
{
    username: 'userid',
    div: Number
}
 */
exports.initTest = async function (ctx) {
  const username = ctx.request.body.username;
  const div = ctx.request.body.div;

  if (!username) {
    ctx.status = 401;
    return;
  }

  try {
    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    const BJID = await profile.getBJID();
    const newTestInfo = await getTestInfo.makeInitTestInfo(div, BJID)
    const updateprofile = await Profile.findOneAndUpdate(
      { username: username },
      { testInfo: newTestInfo },
      { new: true }
    ).exec();
    ctx.body = updateprofile;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
PATCH /api/proflie/updatetest
{
    username: 'userid',
}
 */
exports.updateTest = async function (ctx) {
  const username = ctx.request.body.username;

  if (!username) {
    ctx.status = 401;
    return;
  }

  try {
    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    const BJID = await profile.getBJID();
    let testInfo = profile.getTestInfo();
    testInfo = await getTestInfo.updateTestInfo(BJID, testInfo);
    const updateprofile = await Profile.findOneAndUpdate(
      { username: username },
      { testInfo: testInfo },
      { new: true }
    ).exec();
    ctx.body = updateprofile;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
PATCH /api/proflie/giveuptest
{
    username: 'userid',
}
 */
exports.giveupTest = async function (ctx) {
  const username = ctx.request.body.username;

  if (!username) {
    ctx.status = 401;
    return;
  }

  try {
    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    let testInfo = profile.getTestInfo();
    testInfo = await getTestInfo.giveupTest(testInfo);
    const updateprofile = await Profile.findOneAndUpdate(
      { username: username },
      { testInfo: testInfo },
      { new: true }
    ).exec();
    ctx.body = updateprofile;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// TODO 
/*
POST /api/proflie/recommend
{
    username: 'userid'
}
 */
exports.recommend = async (ctx) => {
  const { username } = ctx.request.body;

  if (!username) {
    ctx.status = 401;
    return;
  }
  try {
    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    let userTier = profile.userTier;
    let solvedacError = 0;
    if (userTier == -1)
    {
      solvedacError = 1;
    }
    {
      let recommend_problem_id_easy = await searchProblem.searchProblemByTier(userTier - 6 + solvedacError * 6, userTier - 5 + solvedacError * 6, (userTier != -1) ? profile.userBJID : false);
      let recommend_problem_id_normal = await searchProblem.searchProblemByTier(userTier - 4 + solvedacError * 6, userTier - 2 + solvedacError * 6, (userTier != -1) ? profile.userBJID : false);
      let recommend_problem_id_hard = await searchProblem.searchProblemByTier(userTier - 1 + solvedacError * 6, userTier + solvedacError * 6, (userTier != -1) ? profile.userBJID : false);
      let recommend_problem_easy = await searchProblem.getProblemInfoById(recommend_problem_id_easy);
      let recommend_problem_normal = await searchProblem.getProblemInfoById(recommend_problem_id_normal);
      let recommend_problem_hard = await searchProblem.getProblemInfoById(recommend_problem_id_hard);
      ctx.body = [recommend_problem_easy, recommend_problem_normal, recommend_problem_hard];
    }
    //데이터가 비었을 떄 예외처리 필요
  } catch (e) {
    ctx.throw(500, e);
  }
};
