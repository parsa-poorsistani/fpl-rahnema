require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./app/service/db-connection");
const mint = require("./app/service/mint");
const routes = require("./app/routes/path");
const cronJob = require("cron").CronJob;
const port: Number = parseInt(<string>process.env.APPLICATION_PORT);
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/managers", routes.managerRoute);
app.use("/api/v1/players", routes.playerRoute);
app.use("/api/v1/teams", routes.teamRoute);
app.use("/api/v1/events", routes.eventRoute);
app.use("/api/v1/auth", routes.authRoute);

const setupServer = async () => {
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
