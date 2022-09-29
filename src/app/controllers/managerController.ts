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
import errors = require("../helpers/error/path");

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
      if (!team) {
        throw "Internal server error";
      }
      let nb: number = await this.managerService.countPlayersInTeam(team);
      if (!nb) {
        throw "Internal server error";
      }
      return await this.generalSuccessfulResponse(
        res,
        "dashboard sent successfully",
        { data: { manager, nb } }
      );
    } catch (err:any) {
      return this.sendFailedResponse(res, new errors.InternalServerError(err));
    }
  };
}
