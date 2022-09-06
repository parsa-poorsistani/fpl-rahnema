import express from "express";
const routes = express.Router();
const {
  addPlayerToTeam,
  deletePlayerFromTeam,
  makeCaptain,
} = require("../controllers/teamController");
import { authToken } from "../helpers/middleware/authentication";

routes.patch("/delete-player", authToken, deletePlayerFromTeam);
routes.patch("/add-player", authToken, addPlayerToTeam);
routes.patch("/make-captain", authToken, makeCaptain);

module.exports = routes;
