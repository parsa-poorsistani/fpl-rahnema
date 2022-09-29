import { ConnectionRepo } from "../database/repository/connection.repo";
import { FeedRepo } from "../database/repository/feed.repo";
import { LikesRepo } from "../database/repository/likes.repo";
import { ManagerRepo } from "../database/repository/manager.repo";
import { IFeed, IFeedService } from "../interface/feed.interface";
import { IManager } from "../interface/manager.interface";
import { feedDisplay, objId } from "../types/types";

export class FeedService implements IFeedService {
    managerRepo:ManagerRepo;
    feedRepo:FeedRepo;
    connectionRepo:ConnectionRepo;
    likeRepo:LikesRepo;

    constructor() {
        this.managerRepo = new ManagerRepo();
        this.feedRepo = new FeedRepo();
        this.connectionRepo = new ConnectionRepo();
        this.likeRepo = new LikesRepo();
    }

    displayFeeds = async(managerId: objId, gameWeek: number): Promise<feedDisplay[]> => {
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
            const data:feedDisplay = {
                points: feed.points,
                substitutions: await this.feedRepo.convertSubs(feed.substitutions!),
                managerId: feed.managerId,
                feedId: feed._id,
                first_name: (await this.managerRepo.getManagerById(feed.managerId!)).first_name,
                last_name: (await this.managerRepo.getManagerById(feed.managerId!)).last_name,
                event: gameWeek,
                is_liked: await this.likeRepo.isLiked(managerId,feed._id)
            };
            result.push(data);
        }
        return result;
    }
    
    like = async(managerId: objId, feedId: objId): Promise<void> => {
        throw new Error("Method not implemented.");
    }
    dislike= async(managerId: objId, feedId: objId): Promise<void> => {
        throw new Error("Method not implemented.");
    }

};