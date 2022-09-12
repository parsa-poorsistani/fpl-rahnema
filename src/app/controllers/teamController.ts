import models = require("../models/path");
import { Request, Response } from "express";

const addPlayerToTeam = async (req: Request, res: Response) => {
  try {
    const managerId: string = req._id;
    let manager = await models.managerModel
      .findById(managerId)
      .populate("teamId")
      .exec();
    const playerId: number = req.body.id;
    const index: number = req.body.index;
    const currentBudget: number = manager.budget;
    const player = await models.playerModel.findById(playerId);
    
    let team: Array<object> = manager.teamId.picks;
    if (team === null) {
      return res.status(404).json({ msg: "team with this id not found." });
    }
    if(await checkPlayerIsAvailable(player,team)==false) {
      return res.status(403).json({msg:"player alredy in the team."});
    }
    if(!checkIndex(player,index)) {
      return res.status(403).json({msg:"index is not right"});
    }
    if (
      (await addPlayerValidation(player, team)) &&
      currentBudget >= player.now_cost) {
      const data = {
        player: player._id,
      };
      manager.budget = currentBudget - player.now_cost;
      manager.teamId.picks[index] = data;
      manager.save();
      manager.teamId.save();
      return res.status(200).json({ data: manager.teamId.picks });
    }
    return res
      .status(403)
      .json({ msg: "not allowed to add more than 3 players from one team" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const deletePlayerFromTeam = async (req: Request, res: Response) => {
  try {
    const managerId: string = req._id;
    const manager = await models.managerModel
      .findById(managerId)
      .populate("teamId")
      .exec();
    const currentBudget: number = manager.budget;
    const playerId: number = req.body.id;
    const index: number = req.body.index;
    const player = await models.playerModel.findById(playerId);
    let team = manager.teamId.picks;

    if (team === null) {
      res.status(404).json({ msg: "manager not found" });
    }
    const data = {
      player: null,
      is_captain: false,
      is_vice_captain: false,
    };

    manager.budget = currentBudget + player.now_cost;
    manager.teamId.picks[index] = data;
    manager.save();
    manager.teamId.save();
    res.status(200).json({ team });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const makeCaptain = async (req: Request, res: Response) => {
  const managerId: String = req._id;
  const manager = await models.managerModel
    .findById(managerId)
    .populate("teamId")
    .exec();
  const playerId: Number = req.body.elementId;
  const player = await models.playerModel.findOne({ generalId: playerId });
  let team = manager.teamId.picks;
  let oldPlace: number = 0;
  let newPlace: number = 0;
  if (team === null) {
    res.status(404).json({ msg: "manager not found" });
  }
  for (let p of team) {
    if (p.is_captain) {
      break;
    }
    oldPlace++;
  }
  const oldData = {
    multiplier: 1,
    is_captain: false,
  };
  for (let p of team) {
    if (p.player !== null) {
      if (p.player.toString() === player._id.toString()) {
        break;
      }
    }
    newPlace++;
  }
  const newData = {
    multiplier: 2,
    is_captain: true,
  };
  manager.teamId.picks[oldPlace] = oldData;
  manager.teamId.picks[newPlace] = newData;
  manager.teamId.save();
  res.status(200).json({ team });
};

const checkPlayerIsAvailable = async (player:any,team:Array<any>): Promise<boolean>=> {
  const playerId:string = player.web_name;
  for(let p of team) {

    if(p.player===null) {
      continue;
    }
    let p2 = await models.playerModel.findById(p.player);
    if(p2.web_name==playerId) {
      
      return false;
    }
  }
  
  return true;
};

//cheking for no more than 3 players from one team
const addPlayerValidation = async (player: any, team: Array<any>): Promise<boolean> => {
  let num: number = 0;
  for (let p of team) {
    if (p.player !== null) {
      let p2 = await models.playerModel.findById(p.player);
      if (player.teamId === p2.teamId) {
        num++;
      }
    }
  }
  if (num >= 3) {
    return false;
  }
  return true;
};

const checkIndex = (player: any, index: number): boolean => {
  if (player.positionId === 1) {
    if (index === 0 || index===1) {
      return true;
    } 
  }

  if (player.positionId === 2) {
    if (index === 2 || index===3 || index === 4 || index===5 || index===6) {
      return true;
    } 
  }

  if (player.positionId === 3) {
    if (index === 7 || index===8 || index === 9 || index===10 || index===11) {
      return true;
    } 
  }

  if (player.positionId === 4) {
    if (index === 12 || index===13 || index === 14) {
      return true;
    } 
  }

  return false;
};

module.exports = {
  addPlayerToTeam,
  deletePlayerFromTeam,
  makeCaptain,
};
