import { ManagerRepo } from "../database/repository/manager.repo";
import { PlayerRepo } from "../database/repository/player.repo";
import { IPlayer } from "../Interface/player.interface";
import { IManager } from "../Interface/manager.interface";
import { IPick } from "../Interface/team.interface";
import ITeamService = require("../Interface/teamService");
import objId = require("../types/types");

class TeamService implements ITeamService {
  managerRepo = new ManagerRepo();
  playerRepo = new PlayerRepo();

  async addPlayerToTeam(
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string> {
    const team: Array<IPick> = await this.managerRepo.getTeamByManagerId(
      managerId
    );
    const manager: IManager = await this.managerRepo.getManagerById(managerId);
    const currentBudget: number = manager.budget;
    const player: IPlayer = await this.playerRepo.getPlayerById(playerId);

    if (await !this.teamLimit(player, team)) {
      return "not allowed to add more than 3 players from one team";
    }
    if (currentBudget < player.now_cost) {
      return "budget is not enough";
    }
    if (!this.checkIndex(player, index)) {
      return "wrong index";
    }

    const budget: number = currentBudget - Number(player.now_cost);
    await this.managerRepo.updateManagerBudgetById(manager._id, budget);
    await this.managerRepo.updateTeamById(manager.teamId!, player._id, index);
    return "OK";
  }

  async deletePlayerFromTeam(
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string> {
    const manager: IManager = await this.managerRepo.getManagerById(managerId);
    const currentBudget: number = manager.budget;
    const player: IPlayer = await this.playerRepo.getPlayerById(playerId);

    const budget: number = currentBudget + Number(player.now_cost);
    await this.managerRepo.updateManagerBudgetById(manager._id, budget);
    await this.managerRepo.updateTeamById(manager.teamId!, null, index);
    return "OK";
  }

  async teamLimit(player: IPlayer, team: Array<IPick>): Promise<boolean> {
    let num: number = 0;
    for (let p of team) {
      if (p.player !== null) {
        let p2 = await this.playerRepo.getPlayerById(p.player);
        if (player.teamId === p2.teamId) {
          num++;
        }
      }
    }
    if (num >= 3) {
      return false;
    }
    return true;
  }
  checkIndex(player: IPlayer, index: number): boolean {
    if (player.positionId === 1) {
      if (index === 0 || index === 1) {
        return true;
      }
    }

    if (player.positionId === 2) {
      if (
        index === 2 ||
        index === 3 ||
        index === 4 ||
        index === 5 ||
        index === 6
      ) {
        return true;
      }
    }

    if (player.positionId === 3) {
      if (
        index === 7 ||
        index === 8 ||
        index === 9 ||
        index === 10 ||
        index === 11
      ) {
        return true;
      }
    }

    if (player.positionId === 4) {
      if (index === 12 || index === 13 || index === 14) {
        return true;
      }
    }

    return false;
  }
}

export = TeamService;
