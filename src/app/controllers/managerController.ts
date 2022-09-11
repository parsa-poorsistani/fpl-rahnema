import models = require("../models/path");
import { Request, Response } from "express";
import { GlobalError } from "../helpers/error/globalError";

const getDashboard = async (req: Request, res: Response) => {
  try {
    let manager = await models.managerModel
      .findById(req._id)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }]);
    console.log(manager);
    console.log(manager.budget);
    manager.budget = Math.round(manager.budget*10)/10;
    manager.save();
    
    return res.status(200).json({ data: manager });
  } catch (err) {
    res.status(403).json({ msg: err });
  }
};

module.exports = {
  getDashboard,
};
