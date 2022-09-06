const models = require("../models/path");
const service = require("../service/service");
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const signUpManager = async (req: Request, res: Response) => {
  try {
    service.validationErrorHandler(req, res);
    let picks = [];
    for (let i = 0; i < 15; i++) {
      await picks.push({
        player_id: null,
      });
    }
    const team = await models.teamModel.create({
      picks: picks,
    });

    req.body.teamId = team._id;

    const manager = await models.managerModel.create(req.body);
    const token = jwt.sign({ id: manager._id }, process.env.HASH_KEY!);

    res.status(200).json({
      data: {
        manager: await models.managerModel.findById(manager._id),
        token: token,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const logInManager = async(req:Request, res:Response) => {
  try {  
    const {username,password} = req.body;
    const manager = await models.managerModel.find({username:username,password:password});
    if(!manager) {
      res.status(404).json({msg:"wrong info"});
    }
    const token = jwt.sign({ id:manager._id}, process.env.HASH_KEY!);
    res.status(200).json({
      data: {
        manager: manager,
        token: token
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"server failed"});
  }

};


module.exports = { 
  signUpManager,logInManager
};
