const express = require("express");
const routes = express.Router();
import models = require("../../app/models/path");
import controllers = require("../controllers/path");

routes.get('/', controllers.playerController.getAllPlayers);
routes.get('/search',controllers.playerController.getPlayerByName);

module.exports = routes;
