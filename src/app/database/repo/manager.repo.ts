const model = require('../../models/path');

const getManagerById = async(managerId:string):Promise<object> => {
    const manager = await model.managerModel.findById(managerId)
    .populate("teamId")
    .exec();
    console.log("manager teamid: ",manager);
    return manager.teamId.picks;
};

const getTeamByManagerId = async(managerId:string):Promise<object> => {
    const team = await model.managerModel.findById(managerId)
    .populate(["teamId", {path:"teamId", populate: "picks.player"}])
    .exec();
    return team;
};

module.exports = {
    getManagerById,
    getTeamByManagerId
};