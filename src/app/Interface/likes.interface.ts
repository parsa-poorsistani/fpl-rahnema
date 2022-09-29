import { objId } from "../types/types";

export interface ILikesRepo {
    isLiked(managerId:objId,feed:objId):Promise<boolean>;
};

export interface ILikes {
    _id:objId,
    feed?:objId,
    likedBy?:objId
};