import models = require("../models/path");
import { Request, Response } from "express";
import { GlobalError } from "../helpers/error/globalError";

const getDashboard = async (req: Request, res: Response) => {
  try {
    let manager = await models.managerModel
      .findById(req._id)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }]);
    return res.status(200).json({ data: manager });
  } catch (err) {
    res.status(403).json({ msg: err });
  }
};

module.exports = {
  getDashboard,
};
