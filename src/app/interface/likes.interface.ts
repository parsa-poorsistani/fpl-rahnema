import { objId } from "../types/types";

export interface ILikesRepo {
    isLiked(managerId:objId,feed:objId): Promise<boolean>;
    like(managerId:objId,feed:objId): Promise<void>;
    dislike(managerId:objId, feed:objId): Promise<void>;
};

export interface ILikes {
    _id:objId,
    feed?:objId,
    likedBy?:objId
};