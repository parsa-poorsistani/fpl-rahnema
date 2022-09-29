import { model, Schema, Types, ObjectId } from "mongoose";

interface IPLTeam {
  generalId: Number;
  name: String;
  short_name: String;
  strength: Number;
  points: Number;
}

const pl_teamsSchema = new Schema<IPLTeam>(
  {
    generalId: {
      type: Number,
    },
    name: {
      type: String,
    },
    short_name: {
      type: String,
    },
    strength: {
      type: Number,
    },
    points: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

const PLTeam = model("PLTeam", pl_teamsSchema);

module.exports = PLTeam;
