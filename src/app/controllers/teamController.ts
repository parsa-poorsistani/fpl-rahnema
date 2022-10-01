import mongoose from "mongoose";
import { TeamService } from "../service/teamService";
import { ITeamController } from "../interface/team.interface";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { objId } from "../types/types";
import { ApiGeneralService } from "../service/api.general.service";
import { ITeamService } from "../interface/team.interface";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

class TeamController extends ApiGeneralService implements ITeamController {
  teamService: ITeamService;

  constructor() {
    super();
    this.teamService = new TeamService();
  }

  changePlayer = async(req: Request, res: Response): Promise<Response> => {
    try {
      const managerId:objId = new mongoose.Types.ObjectId(req._id);
      const inIndex:number = req.body.inIndex;
      const outIndex:number = req.body.outIndex;
      const inPlayerId:objId = req.body.inId;
      const outPlayerId:objId = req.body.outId;
      const result:boolean = await this.teamService.changePlayer(managerId,inIndex,inPlayerId,outIndex,outPlayerId);
      if(result===false) {
        return res.status(StatusCodes.EXPECTATION_FAILED).json({msg:"error occured"});
      }
      return res.status(StatusCodes.OK).json({msg:"OK"});
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
    }
  }

  addPlayerToTeam = async (req: Request, res: Response): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const response: string = await this.teamService.addPlayerToTeam(
        managerId,
        req.body.id,
        req.body.index
      );
      console.log(response);
      
      if (response == "not allowed to add more than 3 players from one team") {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: response });
      }
      if (response == "budget is not enough") {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: response });
      }
      if (response == "wrong index") {
        return res.status(StatusCodes.FORBIDDEN);
      }

      // return this.generalSuccessfulResponse(res);
      return res.status(200).json({ msg: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  };

  deletePlayerFromTeam = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const playerId: objId = req.body.id;
      const index: number = req.body.index;
      await this.teamService.deletePlayerFromTeam(managerId, playerId, index);
      return res.status(200).json({ msg: "OK" });
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
    }
  };
}

export = TeamController;
