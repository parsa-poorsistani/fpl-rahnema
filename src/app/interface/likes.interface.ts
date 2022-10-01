import { objId } from "../types/types";

export interface ILikeRepo {
    isLiked(managerId:objId,feed:objId): Promise<boolean>;
    like(managerId:objId,feed:objId): Promise<ILike>;
    dislike(managerId:objId, feed:objId): Promise<boolean>;
};

export interface ILike {
    _id:objId,
    feed?:objId,
    likedBy?:objId
};