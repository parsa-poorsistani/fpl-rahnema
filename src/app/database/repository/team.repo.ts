import models = require("../../models/path");
import { IPick, ITeam } from "../../interface/team.interface";
import { objId } from "../../types/types";

export class TeamRepo {
  getTeamById = async (teamId: objId): Promise<ITeam> => {
    const team = await models.teamModel.findById(teamId);
    return team;
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
