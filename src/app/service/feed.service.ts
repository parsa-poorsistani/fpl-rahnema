import { ConnectionRepo } from "../database/repository/connection.repo";
import { EventRepo } from "../database/repository/event.repo";
import { FeedRepo } from "../database/repository/feed.repo";
import { LikeRepo } from "../database/repository/likes.repo";
import {ILike} from "../interface/likes.interface";
import { ManagerRepo } from "../database/repository/manager.repo";
import { IFeed, IFeedService } from "../interface/feed.interface";
import { IManager } from "../interface/manager.interface";
import { feedDisplay, objId } from "../types/types";
import { TeamService } from "./teamService";

export class FeedService implements IFeedService {
    managerRepo:ManagerRepo;
    feedRepo:FeedRepo;
    connectionRepo:ConnectionRepo;
    likeRepo:LikeRepo;
    eventRepo:EventRepo;
    teamService:TeamService;

    constructor() {
        this.managerRepo = new ManagerRepo();
        this.feedRepo = new FeedRepo();
        this.connectionRepo = new ConnectionRepo();
        this.likeRepo = new LikeRepo();
        this.eventRepo = new EventRepo();
        this.teamService = new TeamService();
    }

    displayFeeds = async(managerId: objId): Promise<feedDisplay[]> => {
        const gameWeek:number = parseInt((await this.eventRepo.getCurrentEvent()).generalId)-1;        
        const managers:IManager[] = await this.managerRepo.getManagers();
        let followings:objId[] = [];
        let result:feedDisplay[] = [];
        
        // find connections in which follower is manager:improve
        for(let manager of managers) {
            if(await this.connectionRepo.isFollowing(managerId,manager._id)) {
                followings.push(manager._id);
            }
        }
        
        const feeds:IFeed[] = await this.feedRepo.getFeeds(gameWeek,followings);
        
        for(let feed of feeds) {
            
            let manager:IManager = await this.managerRepo.getManagerById(feed.managerId!);
            // feed.points = await this.teamService.getTeamPoint(manager._id);
            const data:feedDisplay = {
                points: await this.teamService.getTeamPoint(manager._id),                
                substitutions: await this.feedRepo.convertSubs(feed.substitutions!),
                managerId: feed.managerId,
                feedId: feed._id,
                first_name: manager.first_name,
                last_name: manager.last_name,
                event: gameWeek,
                is_liked: await this.likeRepo.isLiked(managerId,feed._id),
                img:null
            };
            result.push(data);
        }
        
        return result;
    }

    like = async(managerId: objId, feedId: objId): Promise<boolean> => {
        const result:ILike = await this.likeRepo.like(managerId,feedId);
        if(!result) { return false };
        return true;
    }

    dislike= async(managerId: objId, feedId: objId): Promise<boolean> => {
        const result:boolean = await this.likeRepo.dislike(managerId,feedId);
        return result;
    }

};