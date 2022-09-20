import express from "express";
const routes = express.Router();
import { ConnectionController } from "../controllers/connection.controller";
import { authToken } from "../helpers/middleware/authentication";
const connectionController = new ConnectionController();

routes.post('/follow',authToken,connectionController.follow);
routes.delete('/unfollow/:userId',authToken,connectionController.unfollow);
routes.get('/followers',authToken,connectionController.displayFollowers);
routes.get('/followings',authToken,connectionController.displayFollowings);
routes.post('/followings/search',authToken,connectionController.searchInFollowings);
routes.post('/followers/search',authToken,connectionController.searchInFollowers);
routes.post('/users/search',authToken,connectionController.search);

export = routes;


