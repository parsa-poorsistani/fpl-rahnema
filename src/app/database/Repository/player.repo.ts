import mongoose from "mongoose";
import models = require("../../models/path");
import { IPlayerRepo } from "../../Interface/player.interface";
import { playerPaginateResponse } from "../../Types/player.type";

export class playerRepo implements IPlayerRepo {
  public paginatePlayers = async (
    filter: string,
    page: Number,
    limit: Number,
    pickIds: mongoose.Types.ObjectId[] = []
  ): Promise<playerPaginateResponse> => {
    let players: playerPaginateResponse = await models.playerModel.paginate(
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
  ): Promise<playerPaginateResponse> => {
    let players: playerPaginateResponse = await models.playerModel.paginate(
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
}
