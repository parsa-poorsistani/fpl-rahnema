import {
  IConnectionController,
  IConnectionService,
} from "../interface/connection.interface";
import { Request, Response } from "express";
import { connectionResponse, objId } from "../types/types";
import { ConnectionService } from "../service/connection.service";
import { ApiGeneralService } from "../service/api.general.service";
import mongoose from "mongoose";
import { InternalServerError } from "../helpers/error/internalServerError";

export class ConnectionController
  extends ApiGeneralService
  implements IConnectionController
{
  connectionService: IConnectionService;
  constructor() {
    super();
    this.connectionService = new ConnectionService();
  }
  public follow = async (req: Request, res: Response): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const target: objId = new mongoose.Types.ObjectId(req.body.target);
      await this.connectionService.follow(managerId, target);
      return this.generalSuccessfulResponse(res, "Follow successfull");
    } catch (error) {
      return this.sendFailedResponse(
        res,
        new InternalServerError("follow failed")
      );
    }
  };

  public unfollow = async (req: Request, res: Response): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const target: objId = new mongoose.Types.ObjectId(req.body.target);
      await this.connectionService.unfollow(managerId, target);
      return this.generalSuccessfulResponse(res, "Unfollow successfull");
    } catch (error) {
      return this.sendFailedResponse(
        res,
        new InternalServerError("Unfollow failed")
      );
    }
  };

  public displayFollowers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const data: connectionResponse[] | null =
        await this.connectionService.displayFollowers(managerId);
      return this.generalSuccessfulResponse(
        res,
        "Sending followers successfull",
        data
      );
    } catch (error) {
      return this.sendFailedResponse(
        res,
        new InternalServerError("Sending followers failed")
      );
    }
  };

  public displayFollowings = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const data: connectionResponse[] | null =
        await this.connectionService.displayFollowings(managerId);
      return this.generalSuccessfulResponse(
        res,
        "Sending followings successfull",
        data
      );
    } catch (error) {
      return this.sendFailedResponse(
        res,
        new InternalServerError("Sending followings failed")
      );
    }
  };

  public search = async (req: Request, res: Response): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const fullName: string = req.body.fullName;
      const data = await this.connectionService.search(managerId, fullName);
      return this.generalSuccessfulResponse(
        res,
        "Sending searched managers successfull",
        data
      );
    } catch (error) {
      return this.sendFailedResponse(
        res,
        new InternalServerError("Sending searched managers failed")
      );
    }
  };

  public searchInFollowers = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const name: string = req.body.name;
      const data: connectionResponse[] | null =
        await this.connectionService.searchInFollowers(managerId, name);
      return this.generalSuccessfulResponse(
        res,
        "Sending searched followers successfull",
        data
      );
    } catch (error) {
      return this.sendFailedResponse(
        res,
        new InternalServerError("Sending searched followers failed")
      );
    }
  };

   searchInFollowings= async (req: Request, res: Response): Promise<Response> => {
    try {
      const managerId: objId = new mongoose.Types.ObjectId(req._id);
      const name: string = req.body.name;
      const data: connectionResponse[] | null =
        await this.connectionService.searchInFollowings(managerId, name);
      return this.generalSuccessfulResponse(
        res,
        "Sending searched followings successfull",
        data
      );
    } catch (error) {      
      return this.sendFailedResponse(
        res,
        new InternalServerError("Sending searched followings failed")
      );
    }
  }
}
