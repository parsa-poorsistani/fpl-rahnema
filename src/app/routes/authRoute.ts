const express = require("express");
const routes = express.Router();
const validator = require("../helpers/validation/authValidation");
import controllers = require("../controllers/path");

routes.post("/signup", controllers.authController.createTempManager);
routes.post("/verify", controllers.authController.verifyEmail);

routes.get("/login", controllers.authController.logInManager);

module.exports = routes;
