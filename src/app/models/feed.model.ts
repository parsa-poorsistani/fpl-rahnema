import mongoose, { Schema } from "mongoose";

const feedSchema = new Schema({
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
