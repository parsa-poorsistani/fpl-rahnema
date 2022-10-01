import { ManagerRepo } from "../database/repository/manager.repo";
import { PlayerRepo } from "../database/repository/player.repo";
import { IPlayer, IPlayerRepo } from "../interface/player.interface";
import { IManager, IManagerRepo } from "../interface/manager.interface";
import { IPick, ITeam } from "../interface/team.interface";
import { ITeamService } from "../interface/team.interface";
import { objId } from "../types/types";
import { TeamRepo } from "../database/repository/team.repo";

export class TeamService implements ITeamService {
  managerRepo: IManagerRepo;
  playerRepo: IPlayerRepo;
  teamRepo;

  constructor() {
    this.managerRepo = new ManagerRepo();
    this.playerRepo = new PlayerRepo();
    this.teamRepo = new TeamRepo();
  }

  getTeamById = async (teamId: objId): Promise<ITeam> => {
    return await this.teamRepo.getTeamById(teamId);
  };

  addPlayerToTeam = async (
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string> => {
    const team: Array<IPick> = await this.managerRepo.getTeamByManagerId(
      managerId
    );
    const manager: IManager | null = await this.managerRepo.getManagerById(
      managerId
    );
    let currentBudget: number = 0;
    if (manager) {
      currentBudget = manager.budget;
    }
    const player: IPlayer = await this.playerRepo.getPlayerById(playerId);

    if (await this.teamLimit(player, team) == false) {      
      return "not allowed to add more than 3 players from one team";
    }
    if (currentBudget < player.now_cost) {
      return "budget is not enough";
    }
    if (!this.checkIndex(player, index)) {
      return "wrong index";
    }

    const budget: number = currentBudget - Number(player.now_cost);
    await this.managerRepo.updateManagerBudgetById(manager!._id, budget);
    await this.managerRepo.updateTeamById(manager!.teamId!, player._id, index);
    return "OK";
  };

  deletePlayerFromTeam = async (
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string> => {
    const manager: IManager | null = await this.managerRepo.getManagerById(
      managerId
    );
    const currentBudget: number = manager!.budget;
    const player: IPlayer = await this.playerRepo.getPlayerById(playerId);

    const budget: number = currentBudget + Number(player.now_cost);
    await this.managerRepo.updateManagerBudgetById(manager!._id, budget);
    await this.managerRepo.updateTeamById(manager!.teamId!, null, index);
    return "OK";
  };

  teamLimit = async (player: IPlayer, team: Array<IPick>): Promise<boolean> => {
    let num: number = 0;
    for (let p of team) {
      if (p.player !== null) {
        let p2 = await this.playerRepo.getPlayerById(p.player);
        if (player.teamId === p2.teamId) {
          num++;
        }
      }
    }
    console.log(num);
    
    if (num >= 3) {
      return false;
    }
    return true;
  };
  checkIndex(player: IPlayer, index: number): boolean {
    if (player.positionId === 1) {
      if (index === 0 || index === 11) {
        return true;
      }
    }

    if (player.positionId === 2) {
      if (
        index === 1 ||
        index === 2 ||
        index === 3 ||
        index === 4 ||
        index === 12
      ) {
        return true;
      }
    }

    if (player.positionId === 3) {
      if (
        index === 5 ||
        index === 6 ||
        index === 7 ||
        index === 8 ||
        index === 13
      ) {
        return true;
      }
    }

    if (player.positionId === 4) {
      if (index === 9 || index === 10 || index === 14) {
        return true;
      }
    }

    return false;
  }

  getTeamPoint = async (managerId: objId): Promise<number> => {
    const team: IPick[] = await this.managerRepo.getTeamByManagerId(managerId);
    let totalPoints: number = 0;
    for (let pick of team) {
      let player = await this.playerRepo.getPlayerById(pick.player);
      if (player) {
        totalPoints += player.event_points;
      }
    }
    return totalPoints;
  };
}
