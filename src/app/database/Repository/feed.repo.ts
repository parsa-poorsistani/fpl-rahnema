import mongoose from 'mongoose';
import models = require('../../models/path');
import {IFeed, IFeedRepo} from '../../Interface/feed.interface';
import { objId, substitution } from '../../types/types';

export class FeedRepo implements IFeedRepo {
    getFeed(gameWeek: number, managerIds: mongoose.Types.ObjectId[]): Promise<IFeed[]> {
        throw new Error('Method not implemented.');
    }
    addSub(managerId: mongoose.Types.ObjectId, sub: substitution): Promise<void> {
        throw new Error('Method not implemented.');
    }
    addLike(managerId: mongoose.Types.ObjectId, liker: mongoose.Types.ObjectId): Promise<void> {
        throw new Error('Method not implemented.');
    }
    removeLike(managerId: mongoose.Types.ObjectId, liker: mongoose.Types.ObjectId): Promise<void> {
        throw new Error('Method not implemented.');
    }
    updatePoints(managerId: mongoose.Types.ObjectId, points: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async createFeed(managerId:objId): Promise<void> {
        for(let i=0;i<38;i++) {
            const event = await models.eventModel.findOne({generalId:i.toString()});
            const data:IFeed = {
                managerId:managerId,
                points:0,
                substitutions:null,
                likers:null,
                event:event._id
            };
            await models.feed_model.create(data);
        }
    };
};