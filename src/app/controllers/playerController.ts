import { Request, Response } from "express";
import { PlayerService } from "../service/player.service";
import { IPlayerController } from "../Interface/player.interface";
import mongoose = require("mongoose");
import { paginateResponseToFrontType } from "../Types/response.type";
import { ApiError } from "../helpers/error/apiError";

export class PlayerController implements IPlayerController {
  myPlayerService: PlayerService;
  constructor() {
    this.myPlayerService = new PlayerService();
  }

  public getPlayerByName = async (req: Request, res: Response) => {
    try {
      const { filter, page, limit, web_name } = req.query;
      console.log(filter);

      let players: paginateResponseToFrontType =
        await this.myPlayerService.paginatePlayerByName(
          filter as string,
          Number(page),
          Number(limit),
          web_name as string,
          new mongoose.Types.ObjectId(req._id)
        );
      return res.status(200).json(players);
    } catch (err) {
      return res
        .status(500)
        .json(new ApiError("An error ocurred while getting players", 500));
    }
  };
}
