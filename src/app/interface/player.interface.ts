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
  news: String;
  event_points: Number;
  first_name: String;
  form: Number;
  now_cost: Number;
  points_per_game: Number;
  second_name: String;
  special: Boolean;
  status: String;
  teamId: Number;
  value_form: Number;
  value_season: Number;
  web_name: String;
  minutes: Number;
  goals_scored: Number;
  assists: Number;
  clean_sheets: Number;
  goals_conceded: Number;
  own_goals: Number;
  penalties_saved: Number;
  penalties_missed: Number;
  yellow_cards: Number;
  red_cards: Number;
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
