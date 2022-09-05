require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./app/service/db-connection");
const mint = require("./app/service/mint");
const routes = require("./app/routes/path");
const cronJob = require("cron").CronJob;
const service = require('./app/service/service')
// const redis = require("redis");
// let redisClient = redis.createClient();  
const port: Number = parseInt(<string>process.env.APPLICATION_PORT);
app.use(express.json());


app.use("/api/v1/registration", routes.authRoute);
app.use("/api/v1/managers", routes.managerRoute);
app.use("/api/v1/players", routes.playerRoute);
app.use("/api/v1/teams", routes.teamRoute);
app.use("/api/v1/events", routes.eventRoute);

const setupServer = async () => {

  // redisClient.connect();
  // redisClient.on('connect', () => {
  //   console.log('Connected!');
  // });
  // redisClient.set("kir","dool");
  await db();
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

setupServer();

// let setCronJob = (): any => {
//   let job = new cronJob("0 0 * * 0", () => {
//     mint.updatePlayerdata();
//   });
//   job.start();
// };

// setCronJob();
