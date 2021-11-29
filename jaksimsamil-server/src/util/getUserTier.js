const request = require("request");

exports.getUserTier = async (BJID) => {
  return new Promise( (resolve, reject) => {
    request.get(
      {
        url: "https://solved.ac/api/v3/user/show?handle=" + BJID,
        json: true
      }, async (error, response, body) => {
        if (!error && response.statusCode == 200)
        {
          console.log(body);
          resolve(body["tier"]);
        }
        else
        {
          console.log(response.statusCode);
          resolve(-1);
        }
      }
    );
  });
}