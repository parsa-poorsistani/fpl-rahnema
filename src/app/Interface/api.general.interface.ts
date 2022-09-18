import { Response } from "express";

export interface IApiGeneralService {
  generalSuccessfulResponse(
    res: Response,
    msg?: string,
    data?: any
  ): Promise<Response>;

  createSuccessfulResponse(
    res: Response,
    msg?: string,
    data?: any
  ): Promise<Response>;
}
