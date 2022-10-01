import { Response } from "express";
import errors = require("../helpers/error/path");

export interface IApiGeneralService {
  generalSuccessfulResponse(
    res: Response,
    msg?: string,
    data?: any
  ): Response;

  createSuccessfulResponse(
    res: Response,
    msg?: string,
    data?: any
  ): Response;

  sendFailedResponse(res: Response, err: errors.BaseError): Response;
};
