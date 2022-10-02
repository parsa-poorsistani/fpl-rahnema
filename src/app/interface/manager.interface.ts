import { objId, repoReponseType } from "../types/types";
import { IPick, ITeam } from "./team.interface";
import { Request, Response } from "express";
import { managerUpdateType } from "../types/manager.type";
import errors = require("../helpers/error/path");

export interface IManagerRepo {
  getManagerById(managerId: objId): Promise<IManager | null>;
  getManagersByName(name: string): Promise<IManager[] | null>;
  getManagers(): Promise<Array<IManager>>;
  getTeamByManagerId(managerId: objId): Promise<Array<IPick>>;
  getTeamDetailByManagerId(managerId: objId): Promise<any>;
  updateManagerBudgetById(managerId: objId, budget: number): Promise<void>;
  updateTeamById(
    teamId: objId,
    data: objId | null,
    index: number
  ): Promise<void>;
  createManager(managerData: object): Promise<IManager>;
  findManager(username: string): Promise<IManager>;
  createTeam(): Promise<objId>;
  getManagerByEmail(email: string): Promise<IManager>;
  updateManager(
    managerId: objId,
    newManager: managerUpdateType
  ): Promise<IManager | null>;
}

export interface IManager {
  _id: objId;
  first_name: string;
  last_name: string;
  username: string;
  country: string;
  password: string;
  email: string;
  age: number;
  points: number;
  budget: number;
  teamId?: objId;
}

export interface IManagerController {
  managerService: IManagerService;
  getDashboard(req: Request, res: Response): Promise<Response>;
  updateProfile(req: Request, res: Response): Promise<Response>;
}

export interface IManagerService {
  managerRepo: IManagerRepo;
  countPlayersInTeam(team: ITeam): Promise<number>;
  getTeamPlayerIdsByManagerId(id: objId): Promise<Array<objId>>;
  getManagerById(managerId: objId): Promise<IManager>;
  getManagerByEmail(email: string): Promise<IManager>;
  updateManager(
    managerId: objId,
    newManager: managerUpdateType
  ): Promise<IManager | errors.NotFoundError>;
}
