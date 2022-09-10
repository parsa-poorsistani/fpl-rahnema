import models = require("../../app/models/path");
import { Request, Response } from "express";

const getCurrentWeekInfo = async (req: Request, res: Response) => {
  let event = await models.eventModel.findOne({ is_current: true });

  res.status(200).json({ data: event });
};

export {getCurrentWeekInfo};
