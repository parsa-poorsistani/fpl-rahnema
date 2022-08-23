import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  generalId: {
    type: Number,
    trim: true,
    // default: null,
  }, //id
  fname: { type: String, trim: true, default: null }, //first_name
  lname: { type: String, trim: true, default: null }, //secondName
  web_name: { type: String, trim: true, default: null }, //web_name
  price: { type: String, trim: true, default: null }, //now_cost/10
  teamId: { type: String, trim: true, default: null }, //team
  team_code: { type: String, trim: true, default: null }, //team_code
  positionId: {
    type: String,
    trim: true,
    default: null,
  }, //element_type
  points: { type: Number, trim: true, default: null }, //total_points
  value_season: { type: Number, trim: true, default: null }, //value_season
  minutes: { type: Number, trim: true, default: null }, //minutes
  goals_scored: { type: Number, trim: true, default: null }, //goals_scored
  yellow_cards: { type: Number, trim: true, default: null }, //yellow_cards
  red_cards: { type: Number, trim: true, default: null }, //red_cards
  influence: { type: Number, trim: true, default: null }, //influence
  creativity: { type: Number, trim: true, default: null }, //creativity
  threat: { type: Number, trim: true, default: null }, //threat
  in_dreamteam: { type: Boolean, trim: true, default: false }, //in_dreamteam
});

playerSchema.virtual("position", {
  ref: "position",
  localField: "positionId",
  foreignField: "generalId",
  justOne: true,
});

playerSchema.set("toObject", { virtuals: true });
playerSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("player", playerSchema);
