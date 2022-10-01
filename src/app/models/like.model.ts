import mongoose from "mongoose";
import { ILike } from "../interface/likes.interface";

const likeSchema = new mongoose.Schema<ILike>({
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