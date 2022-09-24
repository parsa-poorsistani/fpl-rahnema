import mongoose from "mongoose";
import { PlayerRepo } from "../database/repository/player.repo";
import { IPlayerService } from "../interface/player.interface";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../types/response.type";
import { ManagerService } from "./manager.service";
import utils = require("../helpers/utils/utils");

export class PlayerService implements IPlayerService {
  myPlayerRepo: PlayerRepo;
  managerService: ManagerService;

  constructor() {
    this.myPlayerRepo = new PlayerRepo();
    this.managerService = new ManagerService();
  }

  public async paginatePlayerByName(
    filter: string,
    page: Number,
    limit: Number,
    web_name: string,
    managerId: mongoose.Types.ObjectId
  ): Promise<paginateResponseToFrontType> {
    let pickIds = await this.managerService.getTeamPlayerIdsByManagerId(
      new mongoose.Types.ObjectId(managerId)
    );
    let players: paginateResponseType = await this.myPlayerRepo.getPlayerByName(
      filter as string,
      Number(page),
      Number(limit),
      web_name as string,
      pickIds
    );

    let response = utils.paginationResponseToFront(players);

    return response;
  }
}
