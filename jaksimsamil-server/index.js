const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const fs = require("fs");
const morgan = require("koa-morgan");
const jwtMiddleware = require("./src/lib/jwtMiddleware");
const api = require("./src/api");

require("dotenv").config();

const app = new Koa();
const router = new Router();
const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {
  flags: "a",
});
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(morgan("combined", { stream: accessLogStream }));
const { SERVER_PORT, MONGO_URL } = process.env;

router.use("/api", api.routes());
app.use(router.routes()).use(router.allowedMethods());

console.log(MONGO_URL)

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(SERVER_PORT, () => {
  console.log("Server is running on port", process.env.SERVER_PORT);
});
