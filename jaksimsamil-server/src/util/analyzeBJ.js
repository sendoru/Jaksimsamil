let moment = require("moment");
const searchProblem = require("./searchProblem")

exports.analyzeBJ = async (solvedBJ, userName, userTier) => {
  try {
    if (solvedBJ) {
      let presentDate = moment();
      let presentDate_str = presentDate.format("YYYYMMDD");
      let latestDate = moment(solvedBJ[0].solved_date, "YYYYMMDD");
      let difflatest = presentDate.diff(latestDate, "days");
      let latestSolve = solvedBJ[0];

      let solvedBJbyDATE = {};
      for (let i = 0; i < solvedBJ.length; i++) {
        let solved_date = (solvedBJ[i].solved_date).substr(0, 8);
        if (!(solved_date in solvedBJbyDATE)) {
          solvedBJbyDATE[solved_date] = [];
          solvedBJbyDATE[solved_date].push(solvedBJ[i]);
        } else {
          solvedBJbyDATE[solved_date].push(solvedBJ[i]);
        }
      }

      let latestNum = solvedBJbyDATE[solvedBJ[0].solved_date.substr(0, 8)].length;
      let presentNum =
        presentDate_str in solvedBJbyDATE
          ? solvedBJbyDATE[presentDate_str].length
          : 0;

      let weekNUM = 0;
      let monthNUM = 0;
      let totalNUM = 0;
      for (let i = 0; i < solvedBJ.length; i++) {
        let diffDate = presentDate.diff(
          moment(solvedBJ[i].solved_date, "YYYYMMDD"),
          "days"
        );
        if (diffDate <= 7) {
          weekNUM++;
          monthNUM++;
          totalNUM++;
        } else if (diffDate <= 31) {
          monthNUM++;
          totalNUM++;
        } else {
          totalNUM++;
        }
      }
      let recommend_problem = [undefined, undefined, undefined];
      let solvedacError = 0;
      if (userTier == -1)
      {
        solvedacError = 1;
      }
      {
        let recommend_problem_id_easy = await searchProblem.searchProblemByTier(userTier - 6 + solvedacError * 6, userTier - 5 + solvedacError * 6, (userTier != -1) ? userName : false);
        let recommend_problem_id_normal = await searchProblem.searchProblemByTier(userTier - 4 + solvedacError * 6, userTier - 2 + solvedacError * 6, (userTier != -1) ? userName : false);
        let recommend_problem_id_hard = await searchProblem.searchProblemByTier(userTier - 1 + solvedacError * 6, userTier + solvedacError * 6, (userTier != -1) ? userName : false);
        let recommend_problem_easy = await searchProblem.getProblemInfoById(recommend_problem_id_easy);
        let recommend_problem_normal = await searchProblem.getProblemInfoById(recommend_problem_id_normal);
        let recommend_problem_hard = await searchProblem.getProblemInfoById(recommend_problem_id_hard);
        recommend_problem = [recommend_problem_easy, recommend_problem_normal, recommend_problem_hard];
      }

      let returnOBJ = {
        latestDate: latestDate.format("YYYYMMDD"),
        difflatest: difflatest,
        latestNum: latestNum,
        presentNum: presentNum,
        weekNum: weekNUM,
        monthNum: monthNUM,
        totalNum: totalNUM,
        solvedBJbyDATE: solvedBJbyDATE,
        latestSolve: latestSolve,
        recommend_data: recommend_problem,
      };

      return returnOBJ;
    }
  } catch (e) {
    console.log(e);
  }
};