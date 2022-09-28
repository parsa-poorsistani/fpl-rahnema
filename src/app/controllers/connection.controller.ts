import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import {IConnectionController} from '../Interface/connection.interface';
import { connectionResponse, objId } from "../types/types";
import { ConnectionService } from "../service/connection.service";
import mongoose from 'mongoose';

export class ConnectionController implements IConnectionController {

    connectionService:ConnectionService;

    constructor(){
        this.connectionService = new ConnectionService();
    }
    follow = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const target:objId = new mongoose.Types.ObjectId(req.body.target);
            await this.connectionService.follow(managerId,target);
            return res.status(StatusCodes.OK).json({msg:"OK"});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    unfollow = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const target:objId = new mongoose.Types.ObjectId(req.body.target);            
            await this.connectionService.unfollow(managerId,target);
            return res.status(StatusCodes.OK).json({msg:"OK"});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    displayFollowers = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const data:connectionResponse[]|null = await this.connectionService.displayFollowers(managerId);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }

    };

    displayFollowings = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const data:connectionResponse[]|null = await this.connectionService.displayFollowings(managerId);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    search = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const fullName:string = req.body;
            const data = await this.connectionService.search(managerId,fullName);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    searchInFollowers = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const name:string = req.body.name;
            const data:connectionResponse[]|null = await this.connectionService.searchInFollowers(managerId,name);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    searchInFollowings = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const name:string = req.body.name;
            const data:connectionResponse[]|null = await this.connectionService.searchInFollowings(managerId,name);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };
    
};