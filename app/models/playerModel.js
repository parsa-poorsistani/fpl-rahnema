const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  generalId: { type: String, trim: true, required: true, unique: true }, //id
  fname: { type: String, trim: true, required: true }, //first_name
  lname: { type: String, trim: true, required: true }, //secondName
  web_name: { type: String, trim: true, required: true }, //web_name
  price: { type: String, trim: true, required: true }, //now_cost/10
  teamId: { type: String, trim: true, required: true }, //team
  team_code: { type: String, trim: true, required: true }, //team_code
  photo: { type: String, trim: true, required: true }, //photo
  positionId: { type: mongoose.Types.ObjectId, trim: true, required: true }, //element_type
  points: { type: Number, trim: true }, //total_points
  value_season: { type: Number, trim: true }, //value_season
  minutes: { type: Number, trim: true }, //minutes
  goals_scored: { type: Number, trim: true }, //goals_scored
  yellow_cards: { type: Number, trim: true }, //yellow_cards
  red_cards: { type: Number, trim: true }, //red_cards
  influence: { type: Number, trim: true }, //influence
  creativity: { type: Number, trim: true }, //creativity
  threat: { type: Number, trim: true }, //threat
  in_dreamteam: { type: Boolean, trim: true }, //in_dreamteam
});
