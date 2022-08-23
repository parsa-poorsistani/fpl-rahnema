const express = require("express");
const routes = express.Router();
import models = require("../../app/models/path");
import controllers = require("../controllers/path");
import mint = require("../service/mint");

routes.get("/positions", mint.updatePlayerPositionsData);
routes.get("/playerData", mint.updatePlayerdata);
routes.get("", controllers.playerController.getPlayers);

module.exports = routes;
