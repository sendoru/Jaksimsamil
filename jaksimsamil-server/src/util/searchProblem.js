const request = require("request");

const problemTier = ["x", "b5", "b4", "b3", "b2", "b1",
                          "s5", "s4", "s3", "s2", "s1",
                          "g5", "g4", "g3", "g2", "g1",
                          "p5", "p4", "p3", "p2", "p1",
                          "d5", "d4", "d3", "d2", "d1",
                          "r5", "r4", "r3", "r2", "r1"];

exports.searchProblemByTier = async (lower_bound, upper_bound, userBJID) =>
{
  if (lower_bound < 1) lower_bound = 1;
  if (upper_bound > 30) upper_bound = 30;
  if (upper_bound < 3) upper_bound = 3;
  return new Promise( (resolve) => {
    let reqURL = "https://solved.ac/api/v3/search/problem?query=tier%3A" + problemTier[lower_bound] + ".." + problemTier[upper_bound] + "%20solved%3A100.." + "%20solvable%3Atrue" + (userBJID ? ("%20!solved_by%3A" + userBJID) : "") + "&sort=random";
    request.get(
      {
        url: reqURL,
        json: true
      }, async (error, response, body) => {
        if (!error && response.statusCode == 200 && body["count"] != 0)
        {
          resolve(body["items"][0]["problemId"]);
        }
        else
        {
          reqURL = "https://solved.ac/api/v3/search/problem?query=tier%3A" + problemTier[lower_bound] + ".." + problemTier[upper_bound] + "%20solvable%3Atrue" + "%20solvable%3Atrue" + (userBJID ? ("%20!solved_by%3A" + userBJID) : "") + "&sort=random";
          request.get(
            {
              url: reqURL,
              json: true
            }, async (error, response, body) => {
              if (!error && response.statusCode == 200 && body["count"] != 0)
              {
                resolve(body["items"][0]["problemId"]);
              }
              else
              {
                resolve(1000);
              }
            }
          )
        }
      }
    );
  });
}


exports.getProblemInfoById = async (problemId) => 
{
  return new Promise( (resolve) => {
    request.get(
      {
        url: "https://solved.ac/api/v3/problem/show?problemId=" + problemId,
        json: true
      }, async (error, response, body) =>{
        if (!error && response.statusCode == 200)
        {
          var problemLevel = body["level"];
          var problemName = body["titleKo"];
          resolve({
            problem_number: problemId,
            problem_level: problemLevel,
            problem_title: problemName
          });
        }
        else
        {
          request.get(
            {
              url: "https://solved.ac/api/v3/problem/lookup?problemIds=" + problemId,
              json: true
            }, async (error, response, body) => {
              if (!error && response.statusCode == 200)
              {
                var problemLevel = body[0]["level"];
                var problemName = body[0]["titleKo"];
                resolve({
                  problem_number: problemId,
                  problem_level: problemLevel,
                  problem_title: problemName
                });
              }
              else
              {
                resolve({
                  problem_number: 1000,
                  problem_level: 1,
                  problem_title: "A+B"
                });
              }
            }
          );
        }
      }
    );
  });
}

exports.isSolvedBy = async (problemID, userBJID) =>
{
  return new Promise( (resolve) => {
    let reqURL = "https://solved.ac/api/v3/search/problem?query=" + problemID + "%20solvable%3Atrue" + (userBJID ? ("%20!solved_by%3A" + userBJID) : "");
    request.get(
      {
        url: reqURL,
        json: true
      }, async (error, response, body) => {
        if (!error && response.statusCode == 200)
        {
          resolve(body["count"] != 0);
        }
        else
        {
          resolve(false);
        }
      }
    );
  });
}