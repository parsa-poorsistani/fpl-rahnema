import { Request, Response } from "express";
const { validationResult } = require("express-validator");
import { GlobalError } from "../helpers/error/globalError";

function validationErrorHandler(req: Request, res: Response, status = 400) {
  if (validationResult(req, res).errors.length !== 0) {
    throw new GlobalError(validationResult(req, res).errors, 400);
  }
}

export { validationErrorHandler };
