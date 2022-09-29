import express from "express";
import { PlayerController } from "../controllers/playerController";
import { authToken } from "../helpers/middleware/authentication";
import { updatePlayerdata } from "../database/resource/updateData";
const routes = express.Router();
let playerController = new PlayerController();

routes.get("/search", authToken, playerController.getPlayerByName);
routes.patch("/playerData", updatePlayerdata);

module.exports = routes;
