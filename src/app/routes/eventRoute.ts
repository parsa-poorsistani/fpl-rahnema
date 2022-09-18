const express = require("express");
const routes = express.Router();
import { EventController } from "../controllers/eventController";
const eventController = new EventController();

routes.get("/current/info", eventController.getCurrentEvent);

module.exports = routes;
