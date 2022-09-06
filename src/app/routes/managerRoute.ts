export {};
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/path");
import { authToken } from "../helpers/middleware/authentication";

router.get("/dashboard", authToken, controllers.managerController.getDashboard);

module.exports = router;
