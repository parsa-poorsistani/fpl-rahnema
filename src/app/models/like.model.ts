import mongoose from "mongoose";
import { ILikes } from "../interface/likes.interface";

const likeSchema = new mongoose.Schema<ILikes>({
    feed:{
        type:mongoose.Types.ObjectId
    },
    likedBy:{
        type:mongoose.Types.ObjectId
    }
},{
    versionKey: false
});

const Like = mongoose.model("Like",likeSchema);
export {Like};