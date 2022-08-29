require("dotenv").config();
const express = require("express");
const app = express();
const mint = require("./app/service/mint");
import routes = require("./app/routes/path");
var cronJob = require("cron").CronJob;

app.use(express.json());

let setupServer = (): any => {
  app.listen(process.env.APPLICATION_PORT, () => {
    console.log(`Server is running on port ${process.env.APPLICATION_PORT}`);
  });
};

let setRoutes = (): any => {
  app.use("/api/v1/player", routes.playerRoute);
  app.use("/api/v1/event", routes.eventRoute);
};

let setCronJob = (): any => {
  let job = new cronJob("0 0 * * 0", () => {
    mint.updatePlayerdata();
  });
  job.start();
};

setupServer();
mint.connectDb();
setRoutes();
// setCronJob();
