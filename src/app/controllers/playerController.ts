import models = require("../../app/models/path");
const axios = require("axios");

const updatePlayerdata = async (req: any, res: any) => {
  const response = await axios.get(process.env.FPL_URL);

  for (let index of response.data.elements) {
    let player = response.data.elements[index];
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
  let players = await models.playerModel.find();
  res.status(200).json({ data: players });
};

const getPlayers = async (req: any, res: any) => {
  let players = await models.playerModel.find();
  res.status(200).json({ data: players });
};

module.exports = { updatePlayerdata, getPlayers };
