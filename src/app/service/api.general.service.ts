import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { IApiGeneralService } from "../interface/api.general.interface";
import errors = require("../helpers/error/path");

export class ApiGeneralService implements IApiGeneralService {
  generalSuccessfulResponse = (
    res: Response,
    msg?: string,
    data?: any
  ): Response => {
    return res.status(StatusCodes.OK).json({ data, msg: msg });
  };

  createSuccessfulResponse = (
    res: Response,
    msg?: string,
    data?: any
  ): Response => {
    return res.status(StatusCodes.CREATED).json({ data: data, msg: msg });
  };

  sendFailedResponse = (res: Response, err: errors.BaseError): Response => {
    return res.status(err.status).json(err);
  };
}
