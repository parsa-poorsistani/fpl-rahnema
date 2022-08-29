export {};
const express = require("express");
const router = express.Router();
const models = require("../../app/models/path");
const controllers = require("../controllers/path");

routes.get("/positionsData", mint.updatePlayerPositionsData);
routes.get("/playerData", mint.updatePlayerdata);
routes.get("/eventData", mint.updateEventdata);
router.route("/search").get(controllers.playerController.getPlayerByName);
routes.get("", controllers.playerController.getPlayers);

module.exports = router;
