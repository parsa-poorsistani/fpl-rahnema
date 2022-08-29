import {ObjectId, model, Schema, Types} from 'mongoose';

interface IManager {
  first_name:String,
  player_region_name:String,
  player_region_iso_code_short:String,
  player_region_iso_code_long:String,
  last_name:String,
  password:String,
  email:String,
  joined_time:Date,
  summary_overall_points:Number,
  summary_overall_rank:Number,
  summary_event_points:Number,
  summary_event_rank:Number,
  current_event:Number,
  teamName:String,
  teamId:ObjectId
};

const managerSchema = new Schema<IManager>({
  first_name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  player_region_name:{
    type:String,
    required:true
  },
  player_region_iso_code_long:{
      type:String,
      required:true
  },
  player_region_iso_code_short:{
      type:String,
      required:true
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
  teamName: {
    type: String,
    required: true,
  },
  teamId :{
    type: Types.ObjectId,
    ref:'Team'
  },
});

const Manager = model("Manager", managerSchema);

module.exports = Manager;
