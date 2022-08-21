const mongoose = require("mongoose");

connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

create = async (model, args) => {
  if (model) {
    let document = await model.create(args);
    return document._id;
  }
};

module.exports = { connectDb, create };
