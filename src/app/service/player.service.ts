import mongoose from "mongoose";
import { PlayerRepo } from "../database/repository/player.repo";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../Types/response.type";
import generalService = require("../service/general.service");

export class PlayerService {
  myPlayerRepo: PlayerRepo;
  constructor() {
    this.myPlayerRepo = new PlayerRepo();
  }

  public async paginatePlayerByName(
    pickIds: Array<mongoose.Types.ObjectId>,
    filter: string,
    page: Number,
    limit: Number,
    web_name: string
  ): Promise<paginateResponseToFrontType> {
    let players: paginateResponseType = await this.myPlayerRepo.getPlayerByName(
      filter as string,
      Number(page),
      Number(limit),
      web_name as string,
      pickIds
    );

    let response = generalService.paginationResponseToFront(players);

    return response;
  }
}
