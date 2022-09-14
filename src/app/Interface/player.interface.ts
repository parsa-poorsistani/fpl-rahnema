import { Types } from "mongoose";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../Types/response.type";
import { Request, Response } from "express";

interface IPlayerController {
  myPlayerService: IPlayerService;
  getPlayerByName(req: Request, res: Response): Promise<Response>;
}

interface IPlayerService {
  myPlayerRepo: IPlayerRepo;

  paginatePlayerByName(
    filter: string,
    page: Number,
    limit: Number,
    web_name: string,
    managerId: Types.ObjectId
  ): Promise<paginateResponseToFrontType>;
}

interface IPlayerRepo {
  paginatePlayers(
    filter: string,
    page: Number,
    limit: Number,
    pickIds: Types.ObjectId[]
  ): Promise<paginateResponseType>;

  getPlayerByName(
    filter: string,
    page: Number,
    limit: Number,
    web_name: string,
    pickIds: Types.ObjectId[]
  ): Promise<paginateResponseType>;

  getPlayerByGeneralId(id: Number): Promise<IPlayer>;
}

interface IPlayer {
  generalId?: Types.ObjectId;
  positionId: Number;
  eventPoints: Number;
  firstName: String;
  secondName: String;
  web_name: String;
  form: Number;
  nowCost: Number;
  pointsPerGame: Number;
  status: String;
  teamId: Number;
  valueSeason: Number;
  minutes: Number;
  goalsScored: Number;
  assists: Number;
  cleanSheets: Number;
  goalsConceded: Number;
  ownGoals: Number;
  penaltiesSaved: Number;
  penaltiesMissed: Number;
  yellowCards: Number;
  redCards: Number;
  saves: Number;
  bonus: Number;
}

export { IPlayerRepo, IPlayer, IPlayerController, IPlayerService };
