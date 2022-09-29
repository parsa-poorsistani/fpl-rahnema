import {ILikesRepo} from '../../interface/likes.interface';
import { objId } from '../../types/types';
import models = require('../../models/path');
import { Types } from 'mongoose';


export class LikesRepo implements ILikesRepo {
    like(managerId: Types.ObjectId, feed: Types.ObjectId): Promise<void> {
        throw new Error('Method not implemented.');
    }
    dislike(managerId: Types.ObjectId, feed: Types.ObjectId): Promise<void> {
        throw new Error('Method not implemented.');
    }

    isLiked = async(managerId: objId,feed: objId): Promise<boolean> => {
        const isLiked = await models.likeModel.findOne({feed:feed, likedBy:managerId});
        if(isLiked) {
            return true;
        }
        return false;
    };

};