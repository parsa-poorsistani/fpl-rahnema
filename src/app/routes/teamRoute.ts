import express from "express";
import TeamController from "../controllers/teamController";
const routes = express.Router();
import { authToken } from "../helpers/middleware/authentication";
const teamController = new TeamController();

routes.patch("/delete-player", authToken, teamController.deletePlayerFromTeam);
routes.patch("/add-player", authToken, teamController.addPlayerToTeam);
routes.patch("/substitution",authToken,teamController.changePlayer);

module.exports = routes;
