export{};
const express = require("express");
const router = express.Router();
const controllers = require('../controllers/path');

router.route('/create').post(controllers.managerController.createManager);


module.exports = routes;