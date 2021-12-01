const Profile = require("../../models/profile");
const sendSlack = require("../../util/sendSlack");
const searchProblem = require("../../util/searchProblem");
/*
POST api/notify/slack/goal
{
  username: "username"
}
*/
exports.slackGoal = async (ctx) => {
  try {
    const { username } = ctx.request.body;

    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    let slackURL = profile.getslackURL();
    if (!slackURL) {
      ctx.status = 401;
      return;
    }
    let goalNum = profile.getgoalNum();
    let todayNum = profile.getTodaySovled();
    let message = "";
    if (goalNum < todayNum) {
      message =
        "오늘의 목표 " +
        goalNum +
        "문제 중 " +
        todayNum +
        "문제를 풀었습니다." +
        "\n" +
        "잘하셨습니다!";
    } else {
      message =
        "오늘의 목표 " +
        goalNum +
        "문제 중 " +
        todayNum +
        "문제를 풀었습니다." +
        "\n" +
        "분발하세요!";
    }

    sendSlack.send(message, slackURL);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
POST api/notify/slack/recommend
{
  username: "username"
}
*/
exports.slackRecommend = async (ctx) => {
  try {
    console.log("1");
    const { username } = ctx.request.body;

    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    let slackURL = profile.getslackURL();
    if (!slackURL) {
      ctx.status = 401;
      return;
    }
    let recommend_problem_id_easy = await searchProblem.searchProblemByTier(profile.userTier - 6, profile.userTier - 5, profile.userBJID);
    let recommend_problem_id_normal = await searchProblem.searchProblemByTier(profile.userTier - 4, profile.userTier - 2, profile.userBJID);
    let recommend_problem_id_hard = await searchProblem.searchProblemByTier(profile.userTier - 1, profile.userTier, profile.userBJID);
    let recommend_problem_easy = await searchProblem.getProblemInfoById(recommend_problem_id_easy);
    let recommend_problem_normal = await searchProblem.getProblemInfoById(recommend_problem_id_normal);
    let recommend_problem_hard = await searchProblem.getProblemInfoById(recommend_problem_id_hard);
    let recommendData = [recommend_problem_easy, recommend_problem_normal, recommend_problem_hard];

    if (!recommendData) {
      ctx.status = 401;
      return;
    }
    let message =
      "오늘의 추천 문제는\n" +

      recommendData[0].problem_number +
      "번 " +
      " <https://www.boj.kr/" +
      recommendData[0].problem_number +
      "|" +
      recommendData[0].problem_title +
      ">,\n" +

      recommendData[1].problem_number +
      "번 " +
      " <https://www.boj.kr/" +
      recommendData[1].problem_number +
      "|" +
      recommendData[1].problem_title +
      ">,\n" +

      recommendData[2].problem_number +
      "번 " +
      " <https://www.boj.kr/" +
      recommendData[2].problem_number +
      "|" +
      recommendData[2].problem_title +
      ">\n" +

      " 입니다.";
    sendSlack.send(message, slackURL);
  } catch (e) {
    ctx.throw(500, e);
  }
};
