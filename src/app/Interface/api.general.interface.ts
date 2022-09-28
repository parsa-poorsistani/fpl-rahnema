import { Response } from "express";

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
}
