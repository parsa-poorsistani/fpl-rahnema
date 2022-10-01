import { Request, Response } from "express";
import { feedDisplay, objId, substitution, substitutionRsponse } from "../types/types";
import { IManager } from "./manager.interface";

export interface IFeedRepo {
  createFeed(managerId: objId): Promise<void>;
  getFeeds(gameWeek: number,managers:objId[]): Promise<Array<IFeed>>;
  convertSubs(subs:Array<substitution>): Promise<Array<substitutionRsponse>|null>;
  addSub(managerId: objId, sub: substitution): Promise<void>;
  updatePoints(managerId: objId, points: number): Promise<void>;
};

export interface IFeedController {
    displayFeeds(req:Request,res:Response):Promise<Response>;
    like(req:Request,res:Response):Promise<Response>;
    disklike(req:Request,res:Response):Promise<Response>;
};

export interface IFeedService {
    displayFeeds(managerId:objId):Promise<Array<feedDisplay>>;
    like(managerId:objId,feedId:objId):Promise<boolean>;
    dislike(managerId:objId,feedId:objId):Promise<boolean>;
};

export interface IFeed {
    _id:objId,
    managerId?:objId,
    points:number,
    substitutions?:Array<substitution>|null,
    likers:Array<objId>|null,
    event?:objId
};