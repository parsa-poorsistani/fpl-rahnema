import { ObjectId, model, Schema, Types } from "mongoose";
import { IPlayer } from "../Interface/player.interface";
const mongoosePaginate = require("mongoose-paginate");

const playerSchema = new Schema<IPlayer>(
  {
    generalId: {
      type: Number,
    },
    positionId: {
      type: Number,
    },
    eventPoints: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
    },
    secondName: {
      type: String,
    },
    form: {
      type: Number,
      default: 0,
    },
    nowCost: {
      type: Number,
    },
    pointsPerGame: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
    },
    teamId: {
      type: Number,
    },
    valueSeason: {
      type: Number,
      default: 0,
    },
    web_name: {
      type: String,
      required: true,
    },
    minutes: {
      type: Number,
      default: 0,
    },
    goalsScored: {
      type: Number,
      default: 0,
    },
    assists: {
      type: Number,
      default: 0,
    },
    cleanSheets: {
      type: Number,
      default: 0,
    },
    goalsConceded: {
      type: Number,
    },
    ownGoals: {
      type: Number,
      default: 0,
    },
    penaltiesSaved: {
      type: Number,
      default: 0,
    },
    penaltiesMissed: {
      type: Number,
      default: 0,
    },
    yellowCards: {
      type: Number,
      default: 0,
    },
    redCards: {
      type: Number,
      default: 0,
    },
    saves: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
    },
  },
  { versionKey: false }
);

playerSchema.virtual("position", {
  ref: "Position",
  localField: "positionId",
  foreignField: "generalId",
  justOne: true,
});

playerSchema.virtual("plTeam", {
  ref: "PLTeam",
  localField: "teamId",
  foreignField: "generalId",
  justOne: true,
});

playerSchema.set("toObject", { virtuals: true });
playerSchema.set("toJSON", { virtuals: true });
playerSchema.plugin(mongoosePaginate);

const Player = model<IPlayer>("Player", playerSchema);
module.exports = Player;
