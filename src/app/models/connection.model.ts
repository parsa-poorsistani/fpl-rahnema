import { Schema } from "mongoose";
import { IConnection} from "../Interface/connection.interface";
import mongoose from 'mongoose';

const connectionSchema = new Schema<IConnection>({
    follower:{
        type:mongoose.Types.ObjectId
    },
    following:{
        type:mongoose.Types.ObjectId
    }
});

const Connection = mongoose.model('Connection',connectionSchema);

export = Connection;