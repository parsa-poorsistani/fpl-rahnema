import express from "express";
const routes = express.Router();
// import teamController  = require("../controllers/teamController");
const {
  addPlayerToTeam,
  deletePlayerFromTeam,
} = require("../controllers/teamController");
import { authToken } from "../helpers/middleware/authentication";

routes.patch("/delete-player", authToken, deletePlayerFromTeam);
routes.patch("/add-player", authToken, addPlayerToTeam);

module.exports = routes;
