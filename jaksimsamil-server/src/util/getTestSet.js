const searchProblem = require("./searchProblem");

const LevelRange =
[[],
[[14, 16], [16, 19], [20, 22], [22, 24], [24, 26], [26, 29]], // Div 1
[[5, 9], [10, 13], [14, 16], [16, 19], [20, 22], [22, 24]], // Div 2
[[4, 8], [8, 10], [10, 12], [12, 14], [14, 16], [16, 17], [17, 19]], // Div 3
[[1, 5], [5, 7], [7, 9], [9, 11], [11, 12], [12, 13], [14, 15]]] // Div 4

exports.getTestSet = async (div, BJID) => {
  if (div < 1 || div > 4) {
    return([]);
  }
  else {
    let ret = [];
    for (let i = 0; i < LevelRange[div].length; i++) {
      ret.push(await searchProblem.searchProblemByTier(LevelRange[div][i][0], LevelRange[div][i][1], BJID));
    }
    return(ret);
  }
}
