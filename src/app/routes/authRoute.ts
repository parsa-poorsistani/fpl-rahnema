const express = require("express");
const routes = express.Router();
const validator = require("../helpers/validation/authValidation");
import controllers = require("../controllers/path");

routes.post(
  "/signup",
  controllers.authController.signUpManager
);
routes.post("/verify", controllers.authController.verify);

routes.post(
  '/login',
  controllers.authController.logInManager
);

module.exports = routes;
