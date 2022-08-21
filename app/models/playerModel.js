const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  generalId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    default: null,
  }, //id
  fname: { type: String, trim: true, required: true, default: null }, //first_name
  lname: { type: String, trim: true, required: true, default: null }, //secondName
  web_name: { type: String, trim: true, required: true, default: null }, //web_name
  price: { type: String, trim: true, required: true, default: null }, //now_cost/10
  teamId: { type: String, trim: true, required: true, default: null }, //team
  team_code: { type: String, trim: true, required: true, default: null }, //team_code
  photo: { type: String, trim: true, required: true, default: null }, //photo
  positionId: {
    type: mongoose.Types.ObjectId,
    trim: true,
    required: true,
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
  in_dreamteam: { type: Boolean, trim: true, default: False }, //in_dreamteam
});
