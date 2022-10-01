import mongoose from "mongoose";
import { objId } from "../types/types";
import { IPlayer } from "./player.interface";
import { Request, Response } from "express";

export interface ITeam {
  _id: objId;
  picks: Array<IPick>;
}

export interface IPick {
  player: mongoose.Types.ObjectId;
}

export interface ITeamController {
  teamService: ITeamService;
  addPlayerToTeam(req: Request, res: Response): Promise<Response>;
  changePlayer(req: Request, res: Response): Promise<Response>;
  deletePlayerFromTeam(req: Request, res: Response): Promise<Response>;
}

export interface ITeamService {
  addPlayerToTeam(
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string>;
  deletePlayerFromTeam(
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string>;
  changePlayer(managerId:objId,inId:number,inPlayerId:objId,outId:number,outPlayerId:objId):Promise<boolean>;
  teamLimit(player: IPlayer, team: Array<IPick>): Promise<boolean>;
  checkIndex(player: IPlayer, index: number): boolean;
  getTeamById(teamId: objId): Promise<ITeam>;
  getTeamPoint(managerId: objId): Promise<number>;
}
