const models = require("../../models/path");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

function authToken(req: Request, res: Response, next: any) {
  let token = req.headers["token"];

  if (token) {
    jwt.verify(token, process.env.HASH_KEY, (err: any, decode: any) => {
      req._id = decode.id;
    });
  }

  next();
}

export { authToken };
