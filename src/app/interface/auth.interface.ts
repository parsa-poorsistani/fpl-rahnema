import { Request, Response } from "express";
import { authResponseData, signInputData } from "../types/types";

interface IauthController {
  signUpManager(req: Request, res: Response): Promise<Response>;
  verify(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
}

interface IauthService {
  signUpManager(input: signInputData): Promise<boolean>;
  verify(email: string, code: string): Promise<authResponseData>;
  login(username: string, password: string): Promise<authResponseData>;
}

export { IauthController, IauthService };
