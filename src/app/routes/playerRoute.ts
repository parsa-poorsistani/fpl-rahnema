export{};
const express = require("express");
const router = express.Router();
import models = require("../../app/models/path");
import controllers = require("../controllers/path");


router.route('/').get(controllers.playerController.getAllPlayers);
router.route('/serach').get(controllers.playerController.getPlayerByName);

module.exports = router;
