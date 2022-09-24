import express from "express";
import { ManagerController } from "../controllers/managerController";
import { authToken } from "../helpers/middleware/authentication";
const router = express.Router();
const managerController = new ManagerController();

router.get("/dashboard", authToken, managerController.getDashboard);

module.exports = router;
