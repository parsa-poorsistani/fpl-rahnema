import express from "express";
import { PlayerController } from "../controllers/playerController";
import { authToken } from "../helpers/middleware/authentication";
const routes = express.Router();
let playerController = new PlayerController();

routes.get("/search", authToken, playerController.getPlayerByName);

module.exports = routes;
