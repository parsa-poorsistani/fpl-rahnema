import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { IApiGeneralService } from "../interface/api.general.interface";
import errors = require("../helpers/error/path");

export class ApiGeneralService implements IApiGeneralService {
  generalSuccessfulResponse = async (
    res: Response,
    msg?: string,
    data?: any
  ): Promise<Response> => {
    return res.status(StatusCodes.OK).json({ data: data, msg: msg });
  };

  createSuccessfulResponse = async (
    res: Response,
    msg?: string,
    data?: any
  ): Promise<Response> => {
    return res.status(StatusCodes.CREATED).json({ data: data, msg: msg });
  };

  sendFailedResponse = async (
    res: Response,
    err: errors.BaseError
  ): Promise<Response> => {
    return res.status(err.status).json(err);
  };
}
