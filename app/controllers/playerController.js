const { model } = require("mongoose");
const models = require("../models/path");
const mint = require("../service/mint");
const mongoose = require("mongoose");

const getPlayer = async (req, res) => {
  getPlayer = await models.playerModel.find();
  res.status(200).json({ data: getPlayer });
};

module.exports = { getPlayer };
