import { Request, Response } from "express";
import { feedDisplay, objId } from "../types/types";
import { IFeedController } from "../interface/feed.interface";
import { FeedService } from "../service/feed.service";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export class FeedController implements IFeedController {

    feedService:FeedService;

    constructor() {
        this.feedService = new FeedService();
    }

    displayFeeds = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const result:feedDisplay[] = await this.feedService.displayFeeds(managerId);
            return res.status(StatusCodes.ACCEPTED).json({data:result});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    like = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const feedId:objId = new mongoose.Types.ObjectId(req.body.feedId);
            const result:boolean = await this.feedService.like(managerId,feedId);
            if(result===false) {
                return res.status(StatusCodes.EXPECTATION_FAILED).json({msg:"Operation Failed"});
            }
            return res.status(StatusCodes.OK).json({msg:"OK"});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
        }
    };

    disklike = async(req: Request, res: Response): Promise<Response> => {
        try {
            const managerId:objId = new mongoose.Types.ObjectId(req._id);
            const feedId:objId = new mongoose.Types.ObjectId(req.body.feedId);
            const result:boolean = await this.feedService.dislike(managerId,feedId);
            if(result===false) {
                return res.status(StatusCodes.EXPECTATION_FAILED).json({msg:"Operation Failed"});
            }
            return res.status(StatusCodes.OK).json({msg:"OK"});
        } catch (error) {
            console.log(error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
        }
    };
    
};