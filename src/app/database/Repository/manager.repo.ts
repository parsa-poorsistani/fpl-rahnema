import models = require("../../models/path");
import { IPick, ITeam } from "../../Interface/team.interface";
import { IManagerRepo, IManager } from "../../Interface/manager.interface";
import objId from "../../types/types";

export class ManagerRepo implements IManagerRepo {
  getManagerById = async (
    managerId: objId,
    populate?: any
  ): Promise<IManager> => {
    const manager = await models.managerModel
      .findById(managerId)
      .populate(populate);
    return manager;
  };

  //where is this used?
  getTeamByManagerId = async (managerId: objId): Promise<Array<IPick>> => {
    const manager = await models.managerModel
      .findById(managerId)
      .populate("teamId")
      .exec();
    return manager.teamId.picks;
  };

  //where is this used?
  getTeamDetailByManagerId = async (managerId: objId): Promise<object> => {
    const team = await models.managerModel
      .findById(managerId)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }])
      .exec();
    return team;
  };

  updateManagerBudgetById = async (
    managerId: objId,
    budget: number
  ): Promise<void> => {
    await models.managerModel.updateOne(
      { _id: managerId },
      { $set: { budget: budget } }
    );
  };

  updateTeamById = async (
    teamId: objId,
    data: objId | null,
    index: number
  ): Promise<void> => {
    //maybe team repo needed
    await models.teamModel.findByIdAndUpdate(teamId, {
      $set: {
        [`picks.${index}.player`]: data,
      },
    });
  };
}
