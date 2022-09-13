import { Types } from "mongoose";
import models = require("../models/path");

export class ManagerService {
  public async getTeamPlayerIdsByManagerId(id: Types.ObjectId) {
    let manager = await models.managerModel
      .findById(id)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }]);
    let picks: Types.ObjectId[] = manager.teamId.picks;
    let pickIds: Types.ObjectId[] = [];
    picks.map((element: any) => {
      if (element.player) {
        pickIds.push(element.player._id);
      }
    });
    return pickIds;
  }
}
