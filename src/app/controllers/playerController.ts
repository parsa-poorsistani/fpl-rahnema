import models = require("../../app/models/path");
import { Request,Response } from "express";

const getAllPlayers = async (req: Request, res: Response) => {
  let players = await models.playerModel.find();
  models.playerModel.res.status(200).json({ data: players });
};

const getPlayerByName = async (req: Request, res: Response) => {
  try {
    const {web_name} = req.body;
    const player = await models.playerModel.find({web_name:{ $regex: web_name}});
    if(Object.keys(player).length ===0) {
      return res.status(404).json({msg:'player not found'});
    }
    res.status(200).json({player});
  } catch (error) {
    console.log(error);
  }

};

module.exports = {
   getAllPlayers,
   getPlayerByName
 };
