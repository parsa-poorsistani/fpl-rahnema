import { constants } from "fs/promises";
import { Types } from "mongoose";
import { ManagerRepo } from "../database/repository/manager.repo";
import { TeamRepo } from "../database/repository/team.repo";
import { IManager, IManagerService } from "../Interface/manager.interface";
import { IPlayer } from "../Interface/player.interface";
import { IPick, ITeam } from "../Interface/team.interface";
import models = require("../models/path");
import { objId } from "../types/types";

export class ManagerService implements IManagerService {
  managerRepo: ManagerRepo;
  teamRepo: TeamRepo;

  constructor() {
    this.managerRepo = new ManagerRepo();
    this.teamRepo = new TeamRepo();
  }

  public countPlayersInTeam = (team: ITeam): number => {
    let count = 0;
    for (let player of team.picks) {
      if (player.player !== null) {
        count++;
      }
    }
    return count;
  };

  public async getTeamPlayerIdsByManagerId(
    id: Types.ObjectId
  ): Promise<Array<objId>> {
    let manager: IManager = await this.managerRepo.getManagerById(id);
    let team: ITeam = await this.teamRepo.getTeamById(manager.teamId!);
    let picks: IPick[] = team.picks;
    let pickIds: objId[] = [];
    await picks.map((element: IPick) => {
      if (element.player) {
        pickIds.push(element.player._id);
      }
    });
    return pickIds;
  }

  public getManagerById = async (managerId: objId): Promise<IManager> => {
    const manager: IManager = await this.managerRepo.getManagerById(managerId, [
      "teamId",
      { path: "teamId", populate: "picks.player" },
    ]);
    manager.budget = Math.round(manager.budget * 10) / 10;
    return manager;
  };
}
