require("dotenv").config();
const models = require("../models/path");
const service = require("../service/service");
const nodemailer = require("nodemailer");
const redis = require("redis");
let redisClient = redis.createClient();
redisClient.connect();
redisClient.on('connect', () => {
  console.log('Connected!');
});  
import { Request, Response } from "express";
import jwt from "jsonwebtoken";



const signUpManager = async (req: Request, res: Response) => {

  // redisClient.connect();
  // redisClient.on('connect', () => {
  //   console.log('Connected!');
  // });
  const {email,country,first_name,last_name,username,password} = req.body;
  let rand = Math.floor((Math.random() * 100) + 54);
  let encodedMail = Buffer.from(email).toString('base64');
  redisClient.hSet(`email:${email}`,
  [
    "first_name",first_name,
    "last_name",last_name,
    "username",username,
    "password",password,
    "country",country,
    "code",encodedMail
  ]
  );
  
  redisClient.expire(`email:${email}`,900);
  service.mailSender(email,"confirmation",encodedMail);
  return res.status(200).json({msg:"ok"});
};

const verify = async(req: Request, res: Response) => {
  // redisClient.connect();
  // redisClient.on('connect', () => {
  //   console.log('Connected!');
  // });
  const { email,code } = req.body;
  //console.log(await redisClient.hGet(`email:${email}`,"code"));
  const verCode = await redisClient.hGet(`email:${email}`,"code");
  if(code!==verCode) {
    return res.status(403).json({msg:"code is wrong"});
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
  const first_name = await redisClient.hGet(`email:${email}`,"first_name");
  const last_name = await redisClient.hGet(`email:${email}`,"last_name");
  const username = await redisClient.hGet(`email:${email}`,"username");
  const password = await redisClient.hGet(`email:${email}`,"password");
  const country = await redisClient.hGet(`email:${email}`,"country");
  const managerData = {
    first_name:first_name,
    last_name:last_name,
    username:username,
    password:password,
    country:country,
    teamId:team._id,
    email:email,
    is_active:true
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

module.exports = { signUpManager,verify };
