import { ObjectId, model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

interface ITempManager {
  first_name: String;
  last_name: String;
  username: String;
  country: String;
  password: String;
  email: String;
  confirmationCode: String;
}

const tempManagerSchema = new Schema<ITempManager>(
  {
    first_name: {
      type: String,
      default: null,
      required: true,
      maxlength: 20,
    },
    last_name: {
      type: String,
      required: true,
      default: null,
      maxlength: 20,
    },
    username: {
      type: String,
      default: null,
      unique: true,
      required: true,
    },
    country: {
      type: String,
      default: null,
      required: true,
    },
    password: {
      type: String,
      default: null,
      required: true,
    },
    email: {
      type: String,
      default: null,
      unique: true,
      required: true,
    },
    confirmationCode: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const tempManager = model("tempManager", tempManagerSchema);

module.exports = tempManager;
