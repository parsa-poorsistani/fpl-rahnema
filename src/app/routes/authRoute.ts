const express = require("express");
const routes = express.Router();
const validator = require("../helpers/validation/authValidation");
import controllers = require("../controllers/path");

routes.post(
  "/signup",
  controllers.authController.signUpManager
);

module.exports = routes;
