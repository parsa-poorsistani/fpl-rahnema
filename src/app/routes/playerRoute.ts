export {};
import express from "express";
import controllers = require("../controllers/path");
import { authToken } from "../helpers/middleware/authentication";
const routes = express.Router();

routes.get("/search", authToken, controllers.playerController.getPlayerByName);
routes.get("/", authToken, controllers.playerController.getPlayers);

module.exports = routes;
