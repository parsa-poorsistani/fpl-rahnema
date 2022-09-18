import { objId,substitution } from '../types/types';

export interface IFeedRepo {
    createFeed(managerId:objId):Promise<void>;
};

export interface IFeed {
    managerId?:objId,
    points:number,
    substitutions?:Array<substitution>|null,
    likes:number,
    event?:objId
};