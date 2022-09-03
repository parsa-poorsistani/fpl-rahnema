const models = require("../../models/path");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

function authenticate(req: Request, res: Response, next: any) {
  console.log(req);

  let token = req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.HASH_KEY, (err: any, decode: any) => {
      console.log(decode);
    });
  }
  next();
}

export { authenticate };
