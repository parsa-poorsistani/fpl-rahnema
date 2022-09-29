import models = require("../../models/path");
import jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import { ApiGeneralService } from "../../service/api.general.service";
import errors = require("../error/path");

type Next = (err?: String) => void | Promise<void>;

function authToken(req: Request, res: Response, next: Next) {
  const apiGeneralService = new ApiGeneralService();
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
          return apiGeneralService.sendFailedResponse(
            res,
            new errors.AccessForbiddenError(
              "User with sent token doesn't exist"
            )
          );
        }
      } else {
        return apiGeneralService.sendFailedResponse(
          res,
          new errors.AccessForbiddenError("Token is invalid")
        );
      }
    });
  } else {
    return apiGeneralService.sendFailedResponse(
      res,
      new errors.BadRequestError("Token not sent")
    );
  }
}

export { authToken };
