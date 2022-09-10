const axios = require('axios');
const plTeamModel = require('../models/pl-teamModel');
const playerModel = require('../models/playerModel');

const createTeam = async() => {
    const response = await axios.get(process.env.FPL_URL);
    
    for(let team of response.data.teams) {
        plTeamModel.create(
            {
                generalId:team.id,
                name:team.name,
                short_name:team.short_name,
                strength:team.strength,
                points:team.points,
            }
        );
    }
    console.log('done');    
};

const createPlayers = async() => {
    const response = await axios.get(process.env.FPL_URL);
    for(let player of response.data.elements) {
        playerModel.create(
            {
                generalId: player.id,
                first_name: player.first_name,
                second_name: player.second_name,
                web_name: player.web_name,
                now_cost: player.now_cost / 10,
                teamId: player.team,
                form:player.form,
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
                in_dreamteam: player.in_dreamteam
            }

        );
    }
    console.log('done');
};


module.exports = {
    createPlayers,
    createTeam
};