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

const managerSchema = new Schema<IManager>(
  {
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
      unique: true,
      required: true,
    },
    country: {
      type: String,
      default: null,
      required: true,
    },
    password: {
      type: String,
      select: false,
      default: null,
      required: true,
    },
    email: {
      type: String,
      default: null,
      unique: true,
      required: true,
    },
    budget: {
      type: Number,
      default: 100,
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
  },
  { versionKey: false }
);

managerSchema.pre("save", async function (next: any) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password.toString(), salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

const Manager = model("Manager", managerSchema);

module.exports = Manager;
