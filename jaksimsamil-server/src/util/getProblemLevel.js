const request = require("request");

exports.getProblemLevel = async (problemID) => {
  return new Promise( (resolve) => {
    request.get(
      {
        url: "https://solved.ac/api/v3/problem/show?problemId=" + problemID,
        json: true
      }, async (error, response, body) => {
        if (!error && response.statusCode == 200)
        {
          resolve(body["level"]);
        }
        else
        {
          resolve(-1);
        }
      }
    );
  });
}