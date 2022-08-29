import models = require("../models/path");
import mongoose = require("mongoose");
import { Request, Response } from "express";
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

const updatePlayerPositionsData = async (req: Request, res: Response) => {
  const response = await axios.get(process.env.FPL_URL);

  for (let position of response.data.element_types) {
    let update = await models.positionModel.update(
      { generalId: position.id },
      {
        plural_name: position.plural_name,
        plural_name_short: position.plural_name_short,
        singular_name: position.singular_name,
        singular_name_short: position.singular_name_short,
        squad_count: position.squad_select,
        squad_min_play: position.squad_min_play,
        squad_max_play: position.squad_max_play,
        ui_shirt_specific: position.ui_shirt_specific,
        sub_positions_locked: position.sub_positions_locked,
        element_count: position.element_count,
      }
    );

    if (update.matchedCount == 0) {
      await models.positionModel.create({
        generalId: position.id,
        plural_name: position.plural_name,
        plural_name_short: position.plural_name_short,
        singular_name: position.singular_name,
        singular_name_short: position.singular_name_short,
        squad_count: position.squad_select,
        squad_min_play: position.squad_min_play,
        squad_max_play: position.squad_max_play,
        ui_shirt_specific: position.ui_shirt_specific,
        sub_positions_locked: position.sub_positions_locked,
        element_count: position.element_count,
      });
    }
  }
  let positions = await models.positionModel.find();
  return res.status(200).json({ data: positions });
};

const updatePlayerdata = async (req: Request, res: Response) => {
  const response = await axios.get(process.env.FPL_URL);

  for (let player of response.data.elements) {
    let update = await models.playerModel.update(
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

    if (update.matchedCount == 0) {
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
  let players = await models.playerModel.find();
  return res.status(200).json({ data: players });
};

export { connectDb, create, updatePlayerdata, updatePlayerPositionsData };
