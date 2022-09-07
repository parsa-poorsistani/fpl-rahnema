require("dotenv").config();
const models = require("../models/path");
const service = require("../service/service");
import { validationErrorHandler } from "../service/service";
const redis = require("redis");
let redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect", () => {
  console.log("Connected!");
});
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Mongoose } from "mongoose";

const signUpManager = async (req: Request, res: Response) => {
  const { email, country, first_name, last_name, username, password } =
    req.body;
  let rand = Math.floor(Math.random() * 100 + 54);
  let encodedMail = Buffer.from(email).toString("base64");
  redisClient.hSet(`email:${email}`, [
    "first_name",
    first_name,
    "last_name",
    last_name,
    "username",
    username,
    "password",
    password,
    "country",
    country,
    "code",
    encodedMail,
  ]);

  redisClient.expire(`email:${email}`, 900);
  service.mailSender(email, "confirmation", encodedMail);
  return res.status(200).json({ msg: "ok" });
};

const verify = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const verCode = await redisClient.hGet(`email:${email}`, "code");
  if (code !== verCode) {
    return res.status(403).json({ msg: "code is wrong" });
  }
  let picks = [];
  for (let i = 0; i < 15; i++) {
    await picks.push({
      player_id: null,
    });
  }
  const team = await models.teamModel.create({
    picks: picks,
  });
  const first_name = await redisClient.hGet(`email:${email}`, "first_name");
  const last_name = await redisClient.hGet(`email:${email}`, "last_name");
  const username = await redisClient.hGet(`email:${email}`, "username");
  const password = await redisClient.hGet(`email:${email}`, "password");
  const country = await redisClient.hGet(`email:${email}`, "country");
  const managerData = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: password,
    country: country,
    teamId: team._id,
    email: email,
  };

  const manager = await models.managerModel.create(managerData);
  const token = jwt.sign({ id: manager._id }, process.env.HASH_KEY!);
  return res.status(200).json({
    data: {
      manager: await models.managerModel.findById(manager._id),
      token: token,
    },
  });
};

const logInManager = async (req: Request, res: Response) => {
  try {
    await validationErrorHandler(req);
    const { username, password } = req.body;
    const manager = await models.managerModel
      .findOne({ username: username })
      .select("password");

    if (!manager) {
      res.status(404).json({ msg: "wrong username" });
    }
    const userPassword: string = manager.password;
    const isValid: boolean = await bcrypt.compare(password, userPassword);
    if (isValid) {
      const token = jwt.sign({ id: manager._id }, process.env.HASH_KEY!);
      return res.status(200).json({
        data: {
          managerId: manager._id,
          token: token,
        },
      });
    }
    return res.status(403).json({ msg: "wrong password" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server failed" });
  }
};

// const createTempManager = async (req: Request, res: Response) => {
//   try {
//     await validationErrorHandler(req);
//     const { email } = req.body;
//     let confirmationCode = Buffer.from(email).toString("base64");
//     req.body.confirmationCode = confirmationCode;
//     const tempManager = await models.tempManagerModel.create(req.body);
//     service.mailSender(email, "confirmation", confirmationCode);
//     return res.status(200).json({ msg: "email sent successfully" });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

// const verifyEmail = async (req: Request, res: Response) => {
//   try {
//     await validationErrorHandler(req);
//     const { email, code } = req.body;
//     const tempManager = await models.tempManagerModel.findOne(
//       { email: email },
//       { _id: 0 }
//     );

//     const newManager = {
//       first_name: tempManager.first_name,
//       last_name: tempManager.last_name,
//       username: tempManager.username,
//       country: tempManager.country,
//       password: tempManager.password,
//       email: tempManager.email,
//     };
//     if (code == tempManager.confirmationCode) {
//       const manager = await models.managerModel.create(newManager);
//       await models.tempManagerModel.deleteOne({ email: email });
//       const token = await jwt.sign({ id: manager._id }, process.env.HASH_KEY!);
//       return res.status(200).json({
//         msg: "signup successful",
//         data: { token: token, manager: manager },
//       });
//     }
//     return res.status(200).json({
//       msg: "wrong confirmation code",
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

module.exports = {
  // signUpManager,
  logInManager,
  verify,
  // createTempManager,
  // verifyEmail,
};
