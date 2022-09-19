import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { IApiGeneralService } from "../Interface/api.general.interface";

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
}
