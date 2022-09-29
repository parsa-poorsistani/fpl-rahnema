import { IPlayer } from "./player.interface";
import { IPick, ITeam } from "./team.interface";
import { objId } from "../types/types";

export interface ITeamService {
  addPlayerToTeam(
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string>;
  deletePlayerFromTeam(
    managerId: objId,
    playerId: objId,
    index: number
  ): Promise<string>;
  teamLimit(player: IPlayer, team: Array<IPick>): Promise<boolean>;
  checkIndex(player: IPlayer, index: number): boolean;
  getTeamPoint(managerId: objId): Promise<number>;
  getTeamById(teamId: objId): Promise<ITeam>;
}
