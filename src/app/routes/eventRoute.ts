const express = require("express");
const routes = express.Router();
import controllers = require("../controllers/path");

routes.get("/current/info", controllers.eventController.getCurrentWeekInfo);

module.exports = routes;
