import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IFeedController } from "../interface/feed.interface";

export class FeedController implements IFeedController {

    displayFeeds(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    };

    like(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    };

    disklike(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
        throw new Error("Method not implemented.");
    };
    
};