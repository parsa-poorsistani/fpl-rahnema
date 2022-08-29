export{};
const express = require("express");
const router = express.Router();
const models = require("../../app/models/path");
const controllers = require("../controllers/path");


router.route('/').get(controllers.playerController.getAllPlayers);
router.route('/serach').get(controllers.playerController.getPlayerByName);

module.exports = router;
