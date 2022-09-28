import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IFeedController } from "../interface/feed.interface";

// export class FeedController implements IFeedController {
//     displayFeed(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
//         throw new Error("Method not implemented.");
//     }
    
// };