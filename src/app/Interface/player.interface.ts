import { Types } from "mongoose";
import { playerPaginateResponse } from "../Types/player.type";

interface IPlayerRepo {
  paginatePlayers(
    filter: string,
    page: Number,
    limit: Number,
    pickIds: Types.ObjectId[]
  ): Promise<playerPaginateResponse>;

  getPlayerByName(
    filter: string,
    page: Number,
    limit: Number,
    web_name: string,
    pickIds: Types.ObjectId[]
  ): Promise<playerPaginateResponse>;
}

interface IPlayer {
  generalId?: Types.ObjectId;
  positionId: Number;
  eventPoints: Number;
  firstName: String;
  secondName: String;
  webName: String;
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

export { IPlayerRepo, IPlayer };
