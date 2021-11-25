exports.StringToDate_BJ = function (date_str) {
  let arr_date = date_str.split(" ")[0].split("-"); //yyyy-MM-dd HH:mm:ss Fomat LIST -> [yyyy, MM, dd]
  let arr_time = date_str.split(" ")[1].split(":"); //yyyy-MM-dd HH:mm:ss Fomat LIST -> [HH, mm, ss]
  return arr_date[0] + arr_date[1] + arr_date[2] + arr_time[0] + arr_time[1] + arr_time[2]; //yyyyMMddHHmmss 형식으로 반환
};
