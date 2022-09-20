import mongoose, { Schema } from 'mongoose';
import { substitution,objId } from '../types/types';
import { IFeed } from '../Interface/feed.interface';
import { ObjectID } from 'bson';

const feedSchema = new Schema<IFeed>({
    managerId:{
        type:mongoose.Types.ObjectId,
        ref:"Manager"
    },
    points:{
        type:Number
    },
    substitutions:{
        type:Array<substitution>
    },
    likers:{
        type:Array<objId>,
        default:null
    },
    event:{
        type:mongoose.Types.ObjectId,
        ref:"Event"
    }
});

const Feed = mongoose.model("Feed",feedSchema);

export = Feed;