import { Request, Response } from "express";
import { PlayerService } from "../service/player.service";
import { ManagerService } from "../service/manager.service";
import { IPlayerController } from "../Interface/player.interface";
import mongoose = require("mongoose");
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../Types/response.type";
import { ApiError } from "../helpers/error/apiError";

export class PlayerController implements IPlayerController {
  myPlayerService: PlayerService;
  managerService: ManagerService;
  constructor() {
    this.myPlayerService = new PlayerService();
    this.managerService = new ManagerService();
  }

  public getPlayerByName = async (req: Request, res: Response) => {
    try {
      const { filter, page, limit, web_name } = req.query;
      let pickIds = await this.managerService.getTeamPlayerIdsByManagerId(
        new mongoose.Types.ObjectId(req._id)
      );
      let players: paginateResponseToFrontType =
        await this.myPlayerService.paginatePlayerByName(
          pickIds,
          filter as string,
          Number(page),
          Number(limit),
          web_name as string
        );
      return res.status(200).json(players);
    } catch (err) {
      return res
        .status(500)
        .json(new ApiError("An error ocurred while getting players", 500));
    }
  };
}
