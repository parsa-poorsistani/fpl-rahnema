import models = require("../models/path");
import { Request, Response } from "express";

const createManager = async (req: Request, res: Response) => {
  try {
    const manager = await models.managerModel.create(req.body);
    res.status(200).json({ manager });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createManager,
};
