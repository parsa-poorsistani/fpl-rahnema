import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    maxlength: 7,
    minlength: 7,
  },
  fName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  lName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  joined_time: {
    type: Date,
    default: Date.now(),
  },
  summary_overall_points: {
    type: Number,
    default: null,
  },
  summary_overall_rank: {
    type: Number,
    default: null,
  },
  summary_event_points: {
    type: Number,
    default: null,
  },
  summary_event_rank: {
    type: Number,
    default: null,
  },
  current_event: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  team:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Team'
  },
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
