import { Types } from "mongoose";
import { ManagerRepo } from "../database/repository/manager.repo";
import { TeamRepo } from "../database/repository/team.repo";
import { IManager, IManagerService } from "../interface/manager.interface";
import { IPick, ITeam } from "../interface/team.interface";
import { managerUpdateType } from "../types/manager.type";
import { objId } from "../types/types";
import errors = require("../helpers/error/path");

export class ManagerService implements IManagerService {
  managerRepo: ManagerRepo;
  teamRepo: TeamRepo;

  constructor() {
    this.managerRepo = new ManagerRepo();
    this.teamRepo = new TeamRepo();
  }

  public countPlayersInTeam = async (team: ITeam): Promise<number> => {
    let count = 0;
    for (let player of team.picks) {
      if (player.player !== null) {
        await count++;
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

  public getManagerByEmail = async (email: string): Promise<IManager> => {
    const manager: IManager = await this.managerRepo.getManagerByEmail(email);
    return manager;
  };

  getManagerByUsername = async (username: string): Promise<IManager> => {
    const manager: IManager = await this.managerRepo.findManager(username);
    return manager;
  };

  public updateManager = async (
    managerId: objId,
    newManager: managerUpdateType
  ): Promise<IManager | errors.NotFoundError> => {
    const manager: IManager | null = await this.managerRepo.updateManager(
      managerId,
      newManager
    );
    if (!manager) {
      return new errors.NotFoundError("Manager not found");
    }
    return manager;
  };
}
