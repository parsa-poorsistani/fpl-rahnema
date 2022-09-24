import mongoose, { Schema } from "mongoose";
import { objId, substitution } from "../types/types";
import { IFeed } from "../interface/feed.interface";

const feedSchema = new Schema<IFeed>({
  managerId: {
    type: mongoose.Types.ObjectId,
    ref: "Manager",
  },
  points: {
    type: Number,
  },
  // substitutions:{
  //     type:Array<substitution>,

  // },
  // likers:{
  //     type:Array<objId>,
  //     default:null
  // },
  event: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
  },
});

const Feed = mongoose.model("Feed", feedSchema);

export = Feed;
