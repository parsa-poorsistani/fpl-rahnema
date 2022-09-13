import models = require("../models/path");
import objId from '../types/types'; 
import mongoose from 'mongoose';
import TeamService = require('../service/teamService');
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const addPlayerToTeam = async (req: Request, res: Response) => {
  try {
    const managerId:objId =new mongoose.Types.ObjectId(req._id);
    const teamService = new TeamService();
    const response:string = await teamService.addPlayerToTeam(managerId,req.body.id,req.body.index);
    if(response=='not allowed to add more than 3 players from one team') {
      return res.status(StatusCodes.FORBIDDEN).json({msg:response});
    }
    if(response=='budget is not enough') {
      return res.status(StatusCodes.FORBIDDEN).json({msg:response});
    }
    if(response=='wrong index') {
      return res.status(StatusCodes.FORBIDDEN)
    }
    return res.status(StatusCodes.OK).json({msg:'OK'});
    
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
  }
};

const deletePlayerFromTeam = async (req: Request, res: Response) => {
  try {
    const managerId: objId = new mongoose.Types.ObjectId(req._id);
    const playerId: objId = req.body.id;
    const index: number = req.body.index;
    const teamService = new TeamService();
    await teamService.deletePlayerFromTeam(managerId,playerId,index);
    res.status(200).json({ msg:'OK' });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

export{
  addPlayerToTeam,
  deletePlayerFromTeam,
};
