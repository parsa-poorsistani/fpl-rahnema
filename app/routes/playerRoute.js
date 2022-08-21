const express = require("express");
const routes = express.Router();
const models = require("../models/path");
const controllers = require("../controllers/path");

routes.get("player", controllers.playerController.getPlayer);

module.exports = routes;
