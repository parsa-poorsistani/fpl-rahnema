import objId from '../types/types';
import {IPick,ITeam} from '../Interface/team.interface';


interface IManagerRepo {
    getManagerById(managerId:objId):Promise<IManager>;
    getTeamByManagerId(managerId:objId):Promise<Array<IPick>>;
    getTeamDetailByManagerId(managerId:objId):Promise<any>;
    updateManagerBudgetById(managerId:objId,budget:number):Promise<void>;
    updateTeamById(teamId: objId,data:objId|null, index:number):Promise<void>;
};

interface IManager {
    _id: objId;
    first_name: string;
    last_name: string;
    username: string;
    country: string;
    password: string;
    email: string;
    budget: number;
    teamId?: objId;
    summaryOverallPoints: number;
    summaryOverallRank: number;
    summaryEventPoints: number;
    summaryEventRank: number;
};

export {IManager,IManagerRepo};