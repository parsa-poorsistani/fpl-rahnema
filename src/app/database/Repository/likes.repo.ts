import {ILikesRepo} from '../../interface/likes.interface';
import { objId } from '../../types/types';
import models = require('../../models/path');


export class LikesRepo implements ILikesRepo {

    isLiked = async(managerId: objId,feed: objId): Promise<boolean> => {
        const isLiked = await models.likeModel.findOne({feed:feed, likedBy:managerId});
        if(isLiked) {
            return true;
        }
        return false;
    };

};