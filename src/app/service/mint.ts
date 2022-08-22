import mongoose = require("mongoose");
import models = require("../models/path");
const axios = require("axios");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
};

const create = async (model: any, args: any) => {
  if (model) {
    let document = await model.create(args);
    return document._id;
  }
};

const updatePlayerdata = async () => {
  const response = await axios.get(process.env.FPL_URL);

  for (let player of response.data.elements) {
    let update = models.playerModel.update(
      { generalId: player.id },
      {
        fname: player.first_name,
        lname: player.second_name,
        web_name: player.web_name,
        price: player.now_cost / 10,
        teamId: player.team,
        team_code: player.team_code,
        positionId: player.element_type,
        points: player.total_points,
        value_season: player.value_season,
        minutes: player.minutes,
        goals_scored: player.goals_scored,
        yellow_cards: player.yellow_cards,
        red_cards: player.red_cards,
        influence: player.influence,
        creativity: player.creativity,
        threat: player.threat,
        in_dreamteam: player.in_dreamteam,
      }
    );
    if (update.nMatched == 0) {
      await models.playerModel.create({
        generalId: player.id,
        fname: player.first_name,
        lname: player.second_name,
        web_name: player.web_name,
        price: player.now_cost / 10,
        teamId: player.team,
        team_code: player.team_code,
        positionId: player.element_type,
        points: player.total_points,
        value_season: player.value_season,
        minutes: player.minutes,
        goals_scored: player.goals_scored,
        yellow_cards: player.yellow_cards,
        red_cards: player.red_cards,
        influence: player.influence,
        creativity: player.creativity,
        threat: player.threat,
        in_dreamteam: player.in_dreamteam,
      });
    }
  }
  // let players = await models.playerModel.find();
  // res.status(200).json({ data: players });
};

module.exports = { connectDb, create, updatePlayerdata };
