import models = require("../../models/path");
import mongoose from "mongoose";
import { IPlayer, IPlayerRepo } from "../../Interface/player.interface";
import { paginateResponseType } from "../../types/response.type";

export class PlayerRepo implements IPlayerRepo {
  public paginatePlayers = async (
    filter: string,
    page: Number,
    limit: Number,
    pickIds: mongoose.Types.ObjectId[] = []
  ): Promise<paginateResponseType> => {
    let players: paginateResponseType = await models.playerModel.paginate(
      {
        _id: { $nin: pickIds },
        positionId: filter == "0" ? { $gt: 0 } : filter ? filter : { $gt: 0 },
      },
      {
        page: page ? page : 1,
        limit: limit ? limit : 10,
        populate: [
          { path: "position", select: ["plural_name_short", "generalId"] },
          { path: "plTeam", select: "short_name" },
        ],
      }
    );
    return players;
  };

  public getPlayerByName = async (
    filter: string,
    page: Number,
    limit: Number,
    web_name: string,
    pickIds: mongoose.Types.ObjectId[] = []
  ): Promise<paginateResponseType> => {
    let players: paginateResponseType = await models.playerModel.paginate(
      {
        web_name: new RegExp("^" + web_name + "w*", "i"),
        positionId: filter == "0" ? { $gt: 0 } : filter ? filter : { $gt: 0 },
        _id: { $nin: pickIds },
      },
      {
        page: page ? page : 1,
        limit: limit ? limit : 10,
        populate: [
          { path: "position", select: ["plural_name_short", "generalId"] },
          { path: "plTeam", select: "short_name" },
        ],
      }
    );
    return players;
  };

  public getPlayerById = async (
    playerId: mongoose.Types.ObjectId
  ): Promise<IPlayer> => {
    const player: IPlayer = await models.playerModel.findById(playerId);
    return player;
  };
}
