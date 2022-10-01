import { Request, Response } from "express";
import { PlayerService } from "../service/player.service";
import { IPlayerController } from "../interface/player.interface";
import mongoose from "mongoose";
import { paginateResponseToFrontType } from "../types/response.type";
import { ApiError } from "../helpers/error/apiError";
import { ApiGeneralService } from "../service/api.general.service";
import errors = require("../helpers/error/path");

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
      if (!players) throw "Internal server error";
      return await this.generalSuccessfulResponse(
        res,
        "players sent successfully",
        players
      );
    } catch (err: any) {
      return await this.sendFailedResponse(
        res,
        new errors.InternalServerError("error in getting players")
      );
    }
  };
}
