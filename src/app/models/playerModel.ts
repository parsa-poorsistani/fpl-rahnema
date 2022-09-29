import { ObjectId, model, Schema, Types } from "mongoose";
import { IPlayer } from "../interface/player.interface";
const mongoosePaginate = require("mongoose-paginate");

const playerSchema = new Schema<IPlayer>(
  {
    generalId: {
      type: Number,
      // required: true,
    },
    positionId: {
      type: Number,
      // required: true,
    },
    event_points: {
      type: Number,
      default: 0,
    },
    first_name: {
      type: String,
      // required: true,
    },
    second_name: {
      type: String,
      // required: true,
    },
    web_name: {
      type: String,
      required: true,
    },
    now_cost: {
      type: Number,
      required: true,
    },
    teamId: {
      type: Number,
    },
    value_season: {
      type: Number,
      default: 0,
    },
    form: {
      type: Number,
      default: 0,
    },
    minutes: {
      type: Number,
      default: 0,
    },
    goals_scored: {
      type: Number,
      default: 0,
    },
    yellow_cards: {
      type: Number,
      default: 0,
    },
    red_cards: {
      type: Number,
      default: 0,
    },
    // status: {
    //   type: String,
    // },

    // assists: {
    //   type: Number,
    //   default: 0,
    // },
    // clean_sheets: {
    //   type: Number,
    //   default: 0,
    // },
    // goals_conceded: {
    //   type: Number,
    // },
    // own_goals: {
    //   type: Number,
    //   default: 0,
    // },
    // penalties_saved: {
    //   type: Number,
    //   default: 0,
    // },
    // penalties_missed: {
    //   type: Number,
    //   default: 0,
    // },
    // saves: {
    //   type: Number,
    //   default: 0,
    // },
    // bonus: {
    //   type: Number,
    // },
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
