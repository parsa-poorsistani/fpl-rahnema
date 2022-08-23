const express = require("express");
const routes = express.Router();
import models = require("../../app/models/path");
import controllers = require("../controllers/path");

routes.get("", controllers.playerController.getPlayers);

module.exports = routes;
