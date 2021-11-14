exports.StringToDate_BJ = function (date_str) {
  let arr_date = date_str.split(" ")[0].split("-"); //yyyy-mm-dd tt:MM:SS Fomat LIST -> [yyyy, mm, dd]
  return arr_date[0] + arr_date[1] + arr_date[2]; //YYYYMMDD 형식으로 반환
};
