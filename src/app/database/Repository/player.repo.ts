import models = require("../../models/path");
import mongoose from "mongoose";
import { IPlayerRepo } from "../../Interface/player.interface";
import { paginateResponseType } from "../../Types/response.type";

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
    console.log(web_name);

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

  public getPlayerByGeneralId = async (id: Number) => {
    const player = await models.playerModel.findOne({ elementId: id });
    return player;
  };
}
