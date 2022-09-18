const express = require("express");
const routes = express.Router();
import {
  handleSignUp,
  handleLogin,
  handleVerify,
} from "../helpers/validation/authValidation";
import { AuthController } from "../controllers/authController";
const authController = new AuthController();
routes.post(
  "/signup",
  handleSignUp(),
  authController.signUpManager
);
routes.post("/verify", handleVerify(), authController.verify);

routes.post("/login", handleLogin(), authController.login);

module.exports = routes;
