import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import {IConnectionController} from '../Interface/connection.interface';
import { connectionResponse, objId } from "../types/types";
import { ConnectionService } from "../service/connection.service";
import mongoose from 'mongoose';
const connectionServive = new ConnectionService();

export class ConnectionController implements IConnectionController {

    async follow(req: Request, res: Response): Promise<Response> {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const target:objId = new mongoose.Types.ObjectId(req.body.target);
            await connectionServive.follow(managerId,target);
            return res.status(StatusCodes.OK).json({msg:"OK"});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    async unfollow(req: Request, res: Response): Promise<Response> {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const target:objId = new mongoose.Types.ObjectId(req.body.target);            
            await connectionServive.unfollow(managerId,target);
            return res.status(StatusCodes.OK).json({msg:"OK"});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    async displayFollowers(req: Request, res: Response): Promise<Response> {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const data:connectionResponse[]|null = await connectionServive.displayFollowers(managerId);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }

    };

    async displayFollowings(req: Request, res: Response): Promise<Response> {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const data:connectionResponse[]|null = await connectionServive.displayFollowings(managerId);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    async search(req: Request, res: Response): Promise<Response> {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const fullName:string = req.body;
            const data = await connectionServive.search(managerId,fullName);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    async searchInFollowers(req: Request, res: Response): Promise<Response> {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const name:string = req.body.name;
            const data:connectionResponse[]|null = await connectionServive.searchInFollowers(managerId,name);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    async searchInFollowings(req: Request, res: Response): Promise<Response> {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const name:string = req.body.name;
            const data:connectionResponse[]|null = await connectionServive.searchInFollowings(managerId,name);
            return res.status(StatusCodes.OK).json({data:data});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };
    
};