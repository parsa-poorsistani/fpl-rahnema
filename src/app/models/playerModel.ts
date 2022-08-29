import mongoose from "mongoose";

interface Player {
  generalId: Number;
  fname: String;
  lname: String;
  web_name: String;
  price: String;
  teamId: String;
  team_code: String;
  positionId: String;
  points: Number;
  value_season: Number;
  minutes: Number;
  goals_scored: Number;
  yellow_cards: Number;
  red_cards: Number;
  influence: Number;
  creativity: Number;
  threat: Number;
  in_dreamteam: Boolean;
}

const playerSchema = new mongoose.Schema<Player>(
  {
    generalId: {
      type: Number,
      trim: true,
      default: null,
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
  },
  { versionKey: false }
);

module.exports = mongoose.model("Player", playerSchema);
