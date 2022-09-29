import { Types } from "mongoose";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../types/response.type";
import { Request, Response } from "express";
import { objId } from "../types/types";

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
  _id: objId;
  generalId: Number;
  positionId: Number;
  event_points: number;
  first_name: String;
  second_name: String;
  web_name: String;
  now_cost: Number;
  teamId: Number;
  value_season: Number;
  form: Number;
  minutes: Number;
  goals_scored: Number;
  yellow_cards: Number;
  red_cards: Number;
  // status: String;
  // assists: Number;
  // clean_sheets: Number;
  // goals_conceded: Number;
  // own_goals: Number;
  // penalties_saved: Number;
  // penalties_missed: Number;
  // saves: Number;
  // bonus: Number;
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
