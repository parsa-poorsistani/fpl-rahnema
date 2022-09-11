import models = require('../../models/path');


const getPlayerByGeneralId = async(id:number) => {
    const player = await models.playerModel.findOne({elementId:id});
    console.log(player);
    console.log("type of player: ", typeof(player));
    return player;
};

module.exports = {getPlayerByGeneralId};

