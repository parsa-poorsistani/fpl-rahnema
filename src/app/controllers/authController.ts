const models = require("../models/path");
const service = require("../service/service");
import { Request, Response } from "express";
import bcrypt from "bcrypt";
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
    const manager = await models.managerModel.findOne({username:username}).select("password");
    console.log(manager);
    
    if(!manager) {
      res.status(404).json({msg:"wrong username"});
    }
    const userPassword:string = manager.password;
    const isValid:boolean = await bcrypt.compare(password,userPassword);
    if(isValid) {
      const token = jwt.sign({ id:manager._id}, process.env.HASH_KEY!);
      return res.status(200).json({
        data: {
          managerId: manager._id,
          token: token
        },
      });
    }
    return res.status(403).json({msg:"wrong password"});
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"server failed"});
  }

};


module.exports = { 
  signUpManager,logInManager
};
