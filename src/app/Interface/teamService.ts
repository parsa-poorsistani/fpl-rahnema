import {IPlayer} from '../Interface/player.interface';
import {ITeam,IPick} from '../Interface/team.interface'; 
import mongoose from 'mongoose';
import objId from '../types/types';


interface ITeamService {
    addPlayerToTeam(managerId:objId,playerId:objId,index:number):Promise<string>;
    deletePlayerFromTeam(managerId:objId,playerId:objId,index:number):Promise<string>;
    teamLimit(player:IPlayer,team:Array<IPick>):Promise<boolean>;
    checkIndex(player:IPlayer,index:number):boolean;
};

export = ITeamService;

