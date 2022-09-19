import { Request, Response } from "express";
import { PlayerService } from "../service/player.service";
import { IPlayerController } from "../Interface/player.interface";
import mongoose = require("mongoose");
import { paginateResponseToFrontType } from "../types/response.type";
import { ApiError } from "../helpers/error/apiError";
import { ApiGeneralService } from "../service/api.general.service";

export class PlayerController
  extends ApiGeneralService
  implements IPlayerController
{
  myPlayerService: PlayerService;
  constructor() {
    super();
    this.myPlayerService = new PlayerService();
  }

  public getPlayerByName = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { filter, page, limit, web_name } = req.query;

      let players: paginateResponseToFrontType =
        await this.myPlayerService.paginatePlayerByName(
          filter as string,
          Number(page),
          Number(limit),
          web_name as string,
          new mongoose.Types.ObjectId(req._id)
        );
      return await this.generalSuccessfulResponse(
        res,
        "players sent successfully",
        players
      );
    } catch (err) {
      return res
        .status(500)
        .json(new ApiError("An error ocurred while getting players", 500));
    }
  };
}
