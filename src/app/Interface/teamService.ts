import {IPlayer} from '../Interface/player.interface';
import {IPick} from '../Interface/team.interface'; 
import {objId} from '../Types/types';


interface ITeamService {
    addPlayerToTeam(managerId:objId,playerId:objId,index:number):Promise<string>;
    deletePlayerFromTeam(managerId:objId,playerId:objId,index:number):Promise<string>;
    teamLimit(player:IPlayer,team:Array<IPick>):Promise<boolean>;
    checkIndex(player:IPlayer,index:number):boolean;
};

export = ITeamService;

