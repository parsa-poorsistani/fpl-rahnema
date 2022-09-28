import { Request,Response } from 'express';
import { objId,substitution } from '../types/types';
export interface IFeedRepo {
    createFeed(managerId:objId):Promise<void>;
    getFeed(gameWeek:number,managerIds:Array<objId>):Promise<Array<IFeed>>;
    addSub(managerId:objId,sub:substitution):Promise<void>;
    addLike(managerId:objId,liker:objId):Promise<void>;
    removeLike(managerId:objId,liker:objId):Promise<void>;
    updatePoints(managerId:objId,points:number):Promise<void>;
};

export interface IFeedController {
    displayFeeds(req:Request,res:Response):Promise<Response>;
    like(req:Request,res:Response):Promise<Response>;
    disklike(req:Request,res:Response):Promise<Response>;
};

export interface IFeedService {
    displayFeeds(managerId:objId,gameWeek:number):Promise<Array<IFeed>>;
    like(managerId:objId,feedId:objId):Promise<void>;
    dislike(managerId:objId,feedId:objId):Promise<void>;
};
export interface IFeed {
    _id:objId,
    managerId?:objId,
    points:number,
    substitutions?:Array<substitution>|null,
    likers:Array<objId>|null,
    event?:objId
};