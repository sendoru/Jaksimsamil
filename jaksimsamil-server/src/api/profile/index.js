const Router = require("koa-router");
const profile = new Router();
const profileCtrl = require("./profile.ctrl");
profile.post("/solved:id");
profile.get("/solvednum:id");
profile.post("/recommend", profileCtrl.recommend);
profile.patch("/syncBJ", profileCtrl.syncBJ);
profile.patch("/initTest", profileCtrl.initTest);
profile.patch("/updateTestInfo", profileCtrl.updateTestInfo)
profile.post("/setprofile", profileCtrl.setProfile);
profile.post("/getprofile", profileCtrl.getProfile);
module.exports = profile;
