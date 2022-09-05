const models = require('../models/path');
import { Request,Response } from "express";

const addPlayerToTeam = async(req:Request,res:Response) => {
    try {
        const managerId:String = req.params.id;
        let manager = await models.managerModel.findById(managerId)
        .populate('teamId')
        .exec();
        const playerId:Number = req.body.elementId;
        const currentBudget:number = manager.budget;
        const player = await models.playerModel.findOne({generalId:playerId});
        
        let team:Array<object> = manager.teamId.picks;        
        if(team===null) {
            return res.status(404).json({msg:'team with this id not found.'});
        }
        if(await addPlayerValidation(player,team)) {
            const data = {
                player:player._id,
            };
            manager.budget = currentBudget-player.now_cost;
            let place:number = findFirstEmpty(player,team);
            manager.teamId.picks[place]=data;
            manager.budget.save();
            manager.teamId.save();
            return res.status(200).json({data:manager.teamId.picks});
        }
        return res.status(403).json({msg:'not allowed to add more than 3 players from one team'});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
};

const deletePlayerFromTeam = async(req:Request,res:Response) => {
    try {
        const managerId:String = req.params.id;
        const manager = await models.managerModel.findById(managerId)
        .populate('teamId')
        .exec();
        const currentBudget:number = manager.budget;
        const playerId:Number = req.body.elementId;
        const player = await models.playerModel.findOne({generalId:playerId});
        let team = manager.teamId.picks;
        let place:number = 0;

        for(let p of team) {
            if(p.player!==null) {
                if(p.player.toString()===player._id.toString()) {
                    break;
                }
            }
            place++;
        }
        
        if(team===null) {
            res.status(404).json({msg:'manager not found'});
        }
        const data = {
            player:null,
            is_captain:false,
            is_vice_captain:false
        };
        
        manager.budget = currentBudget+player.now_cost;
        manager.teamId.picks[place] = data;
        manager.budget.save();
        manager.teamId.save();
        res.status(200).json({team});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
};

const makeCaptain = async(req:Request,res:Response) => {
    const managerId:String = req.params.id;
    const manager = await models.managerModel.findById(managerId)
    .populate('teamId')
    .exec();
    const playerId:Number = req.body.elementId;
    const player = await models.playerModel.findOne({generalId:playerId});
    let team = manager.teamId.picks;
    let oldPlace:number = 0;
    let newPlace:number = 0; 
    if(team===null) {
        res.status(404).json({msg:'manager not found'});
    }
    for(let p of team) {
        if(p.is_captain) {
            break;
        }
        oldPlace++;
    }
    const oldData = {
        multiplier: 1,
        is_captain: false,
    };
    for(let p of team) {
        if(p.player!==null) {
            if(p.player.toString()===player._id.toString()) {
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
    res.status(200).json({team});
};

//cheking for no more than 3 players from one team
const addPlayerValidation = async(player:any, team:Array<any>):Promise<boolean> => {
    let num:number = 0;    
    for(let p of team) {
        if(p.player!==null) {
            let p2 = await models.playerModel.findById(p.player);
            if(player.teamId===p2.teamId) {
                num++;
            }
        }
    }
    if(num>=3){
        return false;
    }
    return true;
};


const findFirstEmpty = (player:any,team:Array<any>):number => {

    if(player.positionId===1){
        if(team[0].player==null){
            return 0;
        } else if(team[1].player==null) {
            return 1;
        }
    }

    if(player.positionId===2) {
        if(team[2].player==null){
            return 2;
        } else if(team[3].player==null) {
            return 3;
        } else if(team[4].player==null) {
            return 4;
        } else if(team[5].player==null) {
            return 5;
        } else if(team[6].player==null) {
            return 6;
        }
    }

    if(player.positionId===3) {
        if(team[7].player==null){
            return 7;
        } else if(team[8].player==null) {
            return 8;
        } else if(team[9].player==null) {
            return 9;
        } else if(team[10].player==null) {
            return 10;
        } else if(team[11].player==null) {
            return 11;
        }
    }

    if(player.positionId===4) {
        if(team[12].player==null){
            return 12;
        } else if(team[13].player==null) {
            return 13;
        } else if(team[14].player==null) {
            return 14;
        }
    }
    
    return 0;
};

module.exports = {
    addPlayerToTeam,
    deletePlayerFromTeam,
    makeCaptain
};