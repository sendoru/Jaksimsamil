const request = require("request");

exports.getUserRating = async (BJID) => {
  return new Promise( (resolve) => {
    request.get(
      {
        url: "https://solved.ac/api/v3/user/show?handle=" + BJID,
        json: true
      }, async (error, response, body) => {
        if (!error && response.statusCode == 200)
        {
          resolve(body["rating"]);
        }
        else
        {
          resolve(-1);
        }
      }
    );
  });
}