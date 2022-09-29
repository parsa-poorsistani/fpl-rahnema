import { Request, Response } from "express";
import {
  IManager,
  IManagerController,
  IManagerService,
} from "../interface/manager.interface";
import { ApiGeneralService } from "../service/api.general.service";
import { ManagerService } from "../service/manager.service";
import { TeamService } from "../service/teamService";
import { ITeam } from "../interface/team.interface";
import mongoose from "mongoose";
import errors = require("../helpers/error/path");
import { ITeamService } from "../interface/teamService";

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
        throw "Could not find team";
      }

      let nb: number = await this.managerService.countPlayersInTeam(team);

      let points = await this.teamService.getTeamPoint(
        new mongoose.Types.ObjectId(req._id)
      );

      return await this.generalSuccessfulResponse(
        res,
        "dashboard sent successfully",
        { data: { manager, nb, points } }
      );
    } catch (err) {
      console.log(err);

      return this.sendFailedResponse(res, new errors.InternalServerError(err));
    }
  };
}
