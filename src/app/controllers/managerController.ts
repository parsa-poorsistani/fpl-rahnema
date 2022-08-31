import models = require("../models/path");
import { Request,Response } from "express";

const createManager = async (req: Request, res: Response) => {  
  try {
    const managerData:Object = req.body;
    const manager = await models.managerModel.create(managerData);    
    let team = await models.teamModel.create();
    
    for(let i=0;i<15;i++){
      let dummy = {
        element:null
      };
      team.picks.push(dummy);
    }
    await manager.updateOne({teamId:team._id});
    return res.status(200).json({manager});
} catch (error) {
    console.log(error);
    return res.status(500).json({msg:error});
}
};

const getManager = (req:Request,res:Response) =>{
  const managerId = req.params.id;
  const manager = models.managerModel.findById(managerId);
  return res.status(200).json({manager});
}; 


module.exports = {
  createManager,
  getManager
};
