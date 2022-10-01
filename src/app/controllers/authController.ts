require("dotenv").config();
import utils = require("../helpers/utils/utils");
import { IauthController } from "../interface/auth.interface";
import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { StatusCodes } from "http-status-codes";
import { authResponseData, signInputData } from "../types/types";
import { ApiGeneralService } from "../service/api.general.service";
import errors = require("../helpers/error/path");

class AuthController extends ApiGeneralService implements IauthController {
  authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  signUpManager = async (req: Request, res: Response): Promise<Response> => {
    try {
      await utils.validationErrorHandler(req);
      const { first_name, last_name, password, username, country, email } =
        req.body;
      const inputData: signInputData = {
        first_name: first_name,
        last_name: last_name,
        password: password,
        username: username,
        country: country,
        email: email,
      };

      const result: boolean = await this.authService.signUpManager(inputData);
      if (!result) {
        throw "signup failed";
      }
      return await this.generalSuccessfulResponse(
        res,
        "Email sent successfully"
      );
    } catch (error) {
      return await this.sendFailedResponse(
        res,
        new errors.InternalServerError(error)
      );
    }
  };

  verify = async (req: Request, res: Response): Promise<Response> => {
    try {
      await utils.validationErrorHandler(req);
      const { code, email } = req.body;
      const data: authResponseData = await this.authService.verify(email, code);
      return await this.generalSuccessfulResponse(
        res,
        "User created successfully",
        data
      );
    } catch (error) {
      return await this.sendFailedResponse(
        res,
        new errors.InternalServerError(error)
      );
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      await utils.validationErrorHandler(req);
      const { username, password } = req.body;
      const data: authResponseData = await this.authService.login(
        username,
        password
      );
      return await this.generalSuccessfulResponse(
        res,
        "login successful",
        data
      );
    } catch (error) {
      if (error instanceof errors.BaseError)
        return this.sendFailedResponse(res, error);
      return this.sendFailedResponse(
        res,
        new errors.InternalServerError(error)
      );
    }
  };
}

export { AuthController };
