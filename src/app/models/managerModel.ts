import { ObjectId, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

interface IManager {
  first_name: String;
  player_region_name: String;
  player_region_iso_code_short: String;
  player_region_iso_code_long: String;
  last_name: String;
  password: String;
  email: String;
  joined_time: Date;
  summary_overall_points: Number;
  summary_overall_rank: Number;
  summary_event_points: Number;
  summary_event_rank: Number;
  current_event: Number;
  teamName: String;
  teamId: ObjectId;
}

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
  player_region_name: {
    type: String,
    required: true,
  },
  player_region_iso_code_long: {
    type: String,
    required: true,
  },
  player_region_iso_code_short: {
    type: String,
    required: true,
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
  teamId: {
    type: Types.ObjectId,
    ref: "Team",
  },
});

managerSchema.pre("save", function (this: any, next: any) {
  if (this.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(this.password, salt, (error, hash) => {
        if (error) {
          return next(error);
        }
        this.password = hash;
        return next(null, this);
      });
    });
  }
  return next(null, this);
});

const Manager = model("Manager", managerSchema);

module.exports = Manager;
