export {};
const express = require("express");
const routes = express.Router();
const models = require("../../app/models/path");
const controllers = require("../controllers/path");
const mint = require("../service/mint");

routes.get("/positionsData", mint.updatePlayerPositionsData);
routes.get("/playerData", mint.updatePlayerdata);
routes.get("/eventData", mint.updateEventdata);
routes.get("/search", controllers.playerController.getPlayerByName);
routes.get("/", controllers.playerController.getPlayers);

module.exports = routes;
