import models = require("../../models/path");
import jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { ApiError } from "../error/apiError";
import mongoose from "mongoose";

type Next = (err?: String) => void | Promise<void>;

function authToken(req: Request, res: Response, next: Next) {
  type token = string;

  type Secret = string | Buffer | { key: string | Buffer; passphrase: string };

  let token = req.headers.token as token;
  let secret_key = process.env.HASH_KEY as Secret;

  if (token) {
    jwt.verify(token, secret_key, async (err: any, decode: any) => {
      if (decode) {
        let manager = await models.managerModel.findById(decode.id);
        if (manager) {
          req._id = decode.id;
          return next();
        } else {
          return res
            .status(403)
            .json(new ApiError("User with sent token doesn't exist", 403));
        }
      } else {
        return res.status(403).json(new ApiError("Token is invalid", 403));
      }
    });
  } else {
    return res.status(403).json(new ApiError("Token not sent", 403));
  }
}

export { authToken };
