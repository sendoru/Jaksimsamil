const axios = require("axios");
const cheerio = require("cheerio");
const StringToDate = require("./StringToDate");
const getProblemLevel = require("./getProblemLevel.js");

// solved.ac에서 괜찮은 api를 지원하는데 정작 문제를 푼 시간은 거기서 못 가져와서 백준을 직접 크롤링 해야 된다.
// 그런데 크롤링하는 시간이 정말 심각하게 긴 것 같다.
// 

/*
TODO
- 예외 처리
*/
exports.getBJ = async function (userid) {
  let data_list = [];
  let next_page_link = "";

  await getStartPage(userid).then((html) => {
    //시작 페이지를 가져온다.
    //같은 객체를 두번 선언한다. 퍼포먼스에 문제 생길수도
    //함수에 객체를 넘기는 방법도 있다.
    //첫 페이지 가져온다.
    data_list.push(getData(html));
    next_page_link = getNextPageLink(html);
  });
  while (next_page_link != -1) {
    //다음 페이지를 가져온다.
    await getNextPage(next_page_link).then((html) => {
      data_list.push(getData(html));
      next_page_link = getNextPageLink(html);
    });
  }
  return data_list.flat(1);
};

const getStartPage = async (userid) => {
  //유저 아이디 입력
  try {
    return await axios.get(
      "https://www.acmicpc.net/status?user_id=" + userid + "&result_id=4"
    );
  } catch (error) {
    console.log(error);
  }
};

const getNextPage = async (link) => {
  //링크 입력
  try {
    return await axios.get(link);
  } catch (error) {
    console.log(error);
  }
};

const getData = (html) => {
  //페이지 데이터 파싱
  let psArr = [];
  const $ = cheerio.load(html.data);
  const $bodyList = $("#status-table > tbody");
  $bodyList.children().each(async (index, element) => {
    var problem_number = $(element).find("a.problem_title").text();
    var problem_title = $(element).find("a.problem_title").attr("title");
    var problem_level = await getProblemLevel.getProblemLevel(problem_number);
    var solved_date = StringToDate.StringToDate_BJ(
      $(element).find("a.real-time-update").attr("title")
    );
    psArr.push({
      problem_number: problem_number,
      problem_title: problem_title,
      problem_level: problem_level,
      solved_date: solved_date
    });
  });
  return psArr;
};
const getNextPageLink = (html) => {
  //다음 페이지가 있으면 다음 페이지 주소 return, 없으면 -1 return
  const $ = cheerio.load(html.data);
  return $("#next_page").attr("href")
    ? "https://www.acmicpc.net/" + $("#next_page").attr("href")
    : -1;
};
