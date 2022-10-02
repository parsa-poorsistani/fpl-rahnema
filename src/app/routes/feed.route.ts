const express = require("express");
const routes = express.Router();
import { FeedController } from "../controllers/feedController";
import { authToken } from "../helpers/middleware/authentication";

const feedController = new FeedController();

routes.get("",authToken, feedController.displayFeeds);
routes.post("/like",authToken,feedController.like);
routes.post("/dislike",authToken,feedController.disklike);

module.exports = routes;