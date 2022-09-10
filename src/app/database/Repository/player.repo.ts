import models = require("../../models/path");
import { IPlayer, IPlayerFunctions } from "../Interface/player.interface";

export class playerRepo implements IPlayerFunctions {
  public paginatePlayers = async (
    filter: string,
    page: Number,
    limit: Number
  ): Promise<IPlayer[]> => {
    let players: IPlayer[] = await models.playerModel.paginate(
      {
        positionId: filter == "0" ? { $gt: 0 } : filter ? filter : { $gt: 0 },
      },
      {
        page: page ? page : 0,
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
    web_name: string
  ): Promise<IPlayer[]> => {
    let players = await models.playerModel.paginate(
      {
        web_name: new RegExp("^" + web_name + "w*", "i"),
        positionId: filter ? filter : { $gt: 0 },
      },
      {
        page: page ? page : 0,
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
