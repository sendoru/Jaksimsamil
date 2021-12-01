const Profile = require("../../models/profile");
const mongoose = require("mongoose");
const getBJ = require("../../util/getBJ");
const Joi = require("joi");
const analyzeBJ = require("../../util/analyzeBJ");
const searchProblem = require("../../util/searchProblem");
const getUserTier = require("../../util/getUserTier");

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
    const profile = await Profile.findOneAndUpdate(
      { username: ctx.request.body.username },
      ctx.request.body,
      {
        new: true,
      }
    ).exec();

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

    let BJdata = await getBJ.getBJ(BJID);
    let BJdata_date = await analyzeBJ.analyzeBJ(BJdata, BJID, newUserTier);
    const updateprofile = await Profile.findOneAndUpdate(
      { username: username },
      { userTier: newUserTier, solvedBJ: BJdata, solvedBJ_date: BJdata_date},
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
    let recommend_problem_id_easy = await searchProblem.searchProblemByTier(profile.userTier - 6, profile.userTier - 5, profile.userBJID);
    let recommend_problem_id_normal = await searchProblem.searchProblemByTier(profile.userTier - 4, profile.userTier - 2, profile.userBJID);
    let recommend_problem_id_hard = await searchProblem.searchProblemByTier(profile.userTier - 1, profile.userTier, profile.userBJID);
    let recommend_problem_easy = await searchProblem.getProblemInfoById(recommend_problem_id_easy);
    let recommend_problem_normal = await searchProblem.getProblemInfoById(recommend_problem_id_normal);
    let recommend_problem_hard = await searchProblem.getProblemInfoById(recommend_problem_id_hard);
    ctx.body = [recommend_problem_easy, recommend_problem_normal, recommend_problem_hard];
    //데이터가 비었을 떄 예외처리 필요
  } catch (e) {
    ctx.throw(500, e);
  }
};
