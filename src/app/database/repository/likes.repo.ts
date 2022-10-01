import {ILike, ILikeRepo} from '../../interface/likes.interface';
import { objId } from '../../types/types';
import models = require('../../models/path');


export class LikeRepo implements ILikeRepo {
    like = async(managerId: objId, feed: objId): Promise<ILike> => {
        const data = {
            feed:feed,
            likedBy:managerId
        }
        return await models.likeModel.create(data);
    }

    dislike = async(managerId: objId, feed: objId): Promise<boolean> => {
        const result:number = await models.likeModel.deleteOne({feed:feed,likedBy:managerId});
        if(result===0) {return false;}
        return true;
    }

    isLiked = async(managerId: objId,feed: objId): Promise<boolean> => {
        const isLiked = await models.likeModel.findOne({feed:feed, likedBy:managerId});
        if(isLiked) {
            return true;
        }
        return false;
    };

};