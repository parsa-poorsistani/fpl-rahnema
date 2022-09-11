import models = require('../../models/path');


const getManagerById = async(id:string) => {
    const manager = await models.managerModel.findById(id)
    .populate("teamId")
    .exec();
    console.log(manager); 
    console.log("type of manager: ",typeof(manager));
    return manager;
};

module.exports = {getManagerById};