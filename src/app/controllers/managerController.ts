import { Request, Response } from "express";
import {
  IManager,
  IManagerController,
  IManagerService,
} from "../interface/manager.interface";
import { ApiGeneralService } from "../service/api.general.service";
import { ManagerService } from "../service/manager.service";
import TeamService = require("../service/teamService");
import { ITeamService, ITeam } from "../interface/team.interface";
import mongoose from "mongoose";

export class ManagerController
  extends ApiGeneralService
  implements IManagerController
{
  managerService: IManagerService;
  teamService: ITeamService;
  constructor() {
    super();
    this.managerService = new ManagerService();
    this.teamService = new TeamService();
  }

  public getDashboard = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let manager: IManager = await this.managerService.getManagerById(
        new mongoose.Types.ObjectId(req._id)
      );
      let team: ITeam = await this.teamService.getTeamById(manager.teamId!);
      let nb: number = await this.managerService.countPlayersInTeam(team);
      return await this.generalSuccessfulResponse(
        res,
        "dashboard sent successfully",
        { data: { manager, nb } }
      );
    } catch (err) {
      return res.status(403).json({ msg: err });
    }
  };
}
