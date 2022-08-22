import mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
};

const create = async (model: any, args: any) => {
  if (model) {
    let document = await model.create(args);
    return document._id;
  }
};

module.exports = { connectDb, create };
