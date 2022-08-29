require("dotenv").config();
const express = require("express");
const app = express();
const db = require('./app/service/db-connection');
const mint = require("./app/service/mint");
const routes = require("./app/routes/path");
const cronJob = require("cron").CronJob;
const port: Number = parseInt(<string>process.env.APPLICATION_PORT);

app.use(express.json());

app.use("/api/v1/manager", routes.managerRoute);
app.use("/api/v1/player", routes.playerRoute);
app.use("/api/v1/event", routes.eventRoute);

const setupServer = async() => {
  await db();
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

setupServer();
mint.connectDb();

// let setCronJob = (): any => {
//   let job = new cronJob("0 0 * * 0", () => {
//     mint.updatePlayerdata();
//   });
//   job.start();
// };

// setCronJob();