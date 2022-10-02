import { objId } from "./types";

export type updateMongoResponseType = {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: objId[];
  upsertedCount: number;
  matchedCount: number;
};
