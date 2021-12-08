const searchProblem = require("./searchProblem");
const getTestSet = require("./getTestSet");
const moment = require("moment");

exports.makeInitTestInfo = async (div, BJID) => {
  let testProblemID = await getTestSet.getTestSet(div, BJID);
  let testProblemData = [];
  let solved = [];
  for (let i = 0; i < testProblemID.length; i++) {
    testProblemData.push(await searchProblem.getProblemInfoById(testProblemID[i]));
    solved.push(false);
  }
  let testInfo = {
    inProgress: true,
    div: div,
    testProblemData: testProblemData,
    solved: solved,
    startTime: moment()
  };
  return testInfo;
}

exports.updateTestInfo = async (BJID, testInfo) => {
  for (let i = 0; i < testInfo.solved.length; i++) {
    testInfo.solved[i] = await searchProblem.isSolvedBy(testInfo.testProblemData[i].problem_number, BJID);
  }
  let elapsedTime = moment().diff(testInfo.startTime);
  // 테스트 진행 시간 : 2.5시간
  let remainedTime = 2.5 * 60 * 60 * 1000 - elapsedTime;
  /*
  if (remainedTime < 0) {
    testInfo.inProgress = false;
  }
  */
  return testInfo;
}

exports.giveupTest = async (testInfo) => {
  testInfo.inProgress = false;
  return testInfo;
}
