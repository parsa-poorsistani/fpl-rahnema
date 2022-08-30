const axios = require('axios');
const plTeamModel = require('../models/pl-teamModel');
const playerModel = require('../models/playerModel');


// const teamFullName = (teamId:number) => {
//     switch(teamId) {
//         case 1:
//             return 'Arsenal';
//         case 4:
//             return 'Brentford';
//         case 5:
//             return 'Brighton';
//         case 6:
//             return 'Chelsea';
//         case 7:
//             return 'Crystal Palace';
//         case 8:
//             return 'Everton';
//         case 9:
//             return 'Fulham';
//         case 10:
//             return 'Leicester';
//         case 11:
//             return 'Leeds';
//         case 12:
//             return 'Liverpool';
//         case 13:
//             return 'Man City';
//         case 14:
//             return 'Man Utd';
//         case 15:
//             return 'Newcastle';
//         case 16:
//             return 'Nott\'m Forest';
//         case 17:
//             return 'Southampton';
//         case 2:
//             return 'Aston Villa';
//         case 19:
//             return 'West Ham';
//         case 3:
//             return 'Bournemouth';
//         case 18:
//             return 'Spurs';
//         case 20:
//             return 'Wolves';
//     }
// };

// const teamShortName = (teamId:number) => {
//     switch(teamId) {
//         case 1:
//             return 'ARS';
//         case 4:
//             return 'BRE';
//         case 5:
//             return 'BHA';
//         case 6:
//             return 'CHE';
//         case 7:
//             return 'CRY';
//         case 8:
//             return 'EVE';
//         case 9:
//             return 'FUL';
//         case 10:
//             return 'LEI';
//         case 11:
//             return 'LEE';
//         case 12:
//             return 'LIV';
//         case 13:
//             return 'MCI';
//         case 14:
//             return 'MUN';
//         case 15:
//             return 'NEW';
//         case 16:
//             return 'NFO';
//         case 17:
//             return 'SOU';
//         case 2:
//             return 'AVL';
//         case 19:
//             return 'WHU';
//         case 3:
//             return 'BOU';
//         case 18:
//             return 'TOT';
//         case 20:
//             return 'WOL';
//     }
// };

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
                // team_short_name:teamShortName(player.team),
                // team_full_name:teamFullName(player.team),
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