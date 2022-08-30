const models = require('../models/path');
import { Request,Response } from "express";


const addPlayerToTeam = async(req:Request,res:Response) => {
    try {
        const managerId = req.params.id;
        const playerId = req.body.elementId;
        const player = models.playerModel.findOne({generalId:playerId});
        const data =  {
            element:player.generalId,
            team:player.teamId,
            position:player.positionId,
            selling_price:player.now_cost,
            purchase_price:player.now_cost
        };
        const team = await models.teamModel.findOne({managerId:managerId});
        if(team===null) {
            return res.status(404).json({mgs:'team with this id not found.'});
        }
        if(addPlayerValidation(player,team.picks)) {
            const team = await models.teamModel.findOneAndUpdate({managerId:managerId},{$push:{picks:data}}, {new: true});
            return res.status(200).json({team});
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
        const playerId:Number = req.body.elementId;
        let team = await models.teamModel.findOne({managerId:managerId});
        if(team===null) {
            res.status(404).json({msg:'manager not found'});
        }
        let result:Array<Object> = [];
        for(let player of team.picks) {
            if(player.generalId!=playerId) {
                result.push(player);
            }
        }
        team.picks = [];
        team = await models.teamModel.findOneAndUpdate(
            {managerId:managerId},
            {$set:{picks:result}},
            {new:true}
        );
        res.status(200).json({team});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
};

//cheking for no more than 3 players from one team
const addPlayerValidation = (player:any, team:Array<any>):boolean => {
    let num:number = 0;

    for(let p of team) {
        if(player.teamId===p.teamId) {
            num++;
        }
    }
    if(num>=3){
        return false;
    }
    return true;
};

module.exports = {
    addPlayerToTeam,
    deletePlayerFromTeam
};