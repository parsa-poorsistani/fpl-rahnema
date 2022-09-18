import mongoose from 'mongoose';
import models = require('../../models/path');
import {IFeed, IFeedRepo} from '../../Interface/feed.interface';
import { objId } from '../../types/types';

export class FeedRepo implements IFeedRepo {
    async createFeed(managerId:objId): Promise<void> {
        for(let i=0;i<89;i++) {
            const event = await models.eventModel.findOne({generalId:i.toString()});
            const data:IFeed = {
                managerId:managerId,
                points:0,
                substitutions:null,
                likes:0,
                event:event._id
            };
            await models.feed_model.create(data);
        }
    };
};