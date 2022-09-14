import { Types } from "mongoose";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../Types/response.type";
import { Request, Response } from "express";
import objId from "../Types/types";

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

  getPlayerById(playerId: objId): Promise<IPlayer>;
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

type playerPaginateResponse = {
  docs: IPlayer[];
  total: Number;
  limit: Number;
  page: Number;
  pages: Number;
};

export {
  IPlayer,
  playerPaginateResponse,
  IPlayerRepo,
  IPlayerService,
  IPlayerController,
};
