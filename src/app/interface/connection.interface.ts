import { Request, Response } from "express";
import { objId } from "../types/types";
import { IManager } from "./manager.interface";
import { connectionResponse } from "../types/types";

export interface IConnectionController {
  follow(req: Request, res: Response): Promise<Response>;
  unfollow(req: Request, res: Response): Promise<Response>;
  displayFollowers(req: Request, res: Response): Promise<Response>;
  displayFollowings(req: Request, res: Response): Promise<Response>;
  search(req: Request, res: Response): Promise<Response>;
  searchInFollowers(req: Request, res: Response): Promise<Response>;
  searchInFollowings(req: Request, res: Response): Promise<Response>;
  //displayUser(req:Request,res:Response):Promise<Response>;
}

export interface IConnectionService {
  follow(managerId: objId, target: objId): Promise<void>;
  unfollow(managerId: objId, target: objId): Promise<void>;
  displayFollowings(
    managerId: objId
  ): Promise<Array<connectionResponse> | null>;
  displayFollowers(managerId: objId): Promise<Array<connectionResponse> | null>;
  search(managerId: objId, name: string): Promise<connectionResponse[] | null>;
  searchInFollowers(
    managerId: objId,
    name: string
  ): Promise<connectionResponse[] | null>;
  searchInFollowings(
    managerId: objId,
    name: string
  ): Promise<connectionResponse[] | null>;
}

export interface IConnectionRepo {
  connect(following: objId, follower: objId): Promise<void>;
  disconnect(following: objId, follower: objId): Promise<void>;
  // findFollowings(managerId:objId):Promise<Array<objId>>;
  // findFollowers(managerId:objId):Promise<Array<objId>>;
  isFollowing(managerId: objId, target: objId): Promise<boolean>;
}

export interface IConnection {
  following?: objId;
  follower?: objId;
}
