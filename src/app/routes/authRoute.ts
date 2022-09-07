const express = require("express");
const routes = express.Router();
import {
  handleSignUp,
  handleLogin,
  handleVerify,
} from "../helpers/validation/authValidation";
import controllers = require("../controllers/path");

routes.post(
  "/signup",
  handleSignUp(),
  controllers.authController.createTempManager
);
routes.post("/verify", handleVerify(), controllers.authController.verifyEmail);

routes.post("/login", handleLogin(), controllers.authController.logInManager);

module.exports = routes;
