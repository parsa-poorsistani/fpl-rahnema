const models = require("../models/path");
import { Request, Response } from "express";

const getDashboard = async (req: Request, res: Response) => {
  let manager = await models.managerModel
    .findById(req._id)
    .populate(["teamId", { path: "teamId", populate: "picks.player" }]);
  return res.status(200).json({ data: manager });
};

module.exports = {
  getDashboard,
};
