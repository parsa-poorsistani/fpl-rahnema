const express = require("express");
const router = express.Router();
import { FileController } from "../controllers/fileController";
import { upload } from "../helpers/middleware/upload";
const fileController = new FileController();

router.post("/single", upload.single("file"), fileController.createFile);

module.exports = router;
