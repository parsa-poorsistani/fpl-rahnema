require("dotenv").config();
const models = require("../models/path");
const service = require("../service/service");
const nodemailer = require("nodemailer");
const redis = require("redis");
let redisClient = redis.createClient();  
import { Request, Response } from "express";
import jwt from "jsonwebtoken";



const signUpManager = async (req: Request, res: Response) => {

  redisClient.connect();
  redisClient.on('connect', () => {
    console.log('Connected!');
  });
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

module.exports = { signUpManager };
