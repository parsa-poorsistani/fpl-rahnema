import { ObjectId, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

interface IManager {
  first_name: String;
  last_name: String;
  username: String;
  country: String;
  password: String;
  email: String;
  budget: Number;
  teamName: String;
  teamId: ObjectId;
  summary_overall_points: Number;
  summary_overall_rank: Number;
  summary_event_points: Number;
  summary_event_rank: Number;
}

const managerSchema = new Schema<IManager>({
  first_name: {
    type: String,
    default: null,
    required: true,
    maxlength: 20,
  },
  last_name: {
    type: String,
    required: true,
    default: null,
    maxlength: 20,
  },
  username: {
    type: String,
    default: null,
    required: true,
  },
  country: {
    type: String,
    default: null,
    required: true,
  },
  password: {
    type: String,
    default: null,
    required: true,
  },
  email: {
    type: String,
    default: null,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
  },
  teamName: {
    type: String,
    default: "",
  },
  teamId: {
    type: Types.ObjectId,
    ref: "Team",
  },
  summary_overall_points: {
    type: Number,
    default: 0,
  },
  summary_overall_rank: {
    type: Number,
    default: null,
  },
  summary_event_points: {
    type: Number,
    default: 0,
  },
  summary_event_rank: {
    type: Number,
    default: null,
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
