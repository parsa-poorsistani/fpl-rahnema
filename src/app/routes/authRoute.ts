const express = require("express");
const routes = express.Router();
import controllers = require("../controllers/path");

routes.post("/signup", controllers.authController.signUpManager);

module.exports = routes;
