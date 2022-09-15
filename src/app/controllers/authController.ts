require("dotenv").config();
import utils = require('../helpers/utils/utils');
import { IauthController } from "../Interface/auth.interface";
import { Request, Response } from "express";
import {AuthService} from "../service/auth.service";
import { StatusCodes } from 'http-status-codes';
import { authResponseData, signInputData } from '../Types/types';
const authService = new AuthService();

class AuthController implements IauthController {

  async signUpManager(req: Request, res: Response): Promise<Response> {
    try {  
      await utils.validationErrorHandler(req);
      const inputData:signInputData = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        password:req.body.password,
        username:req.body.username,
        country:req.body.country,
        email:req.body.email
      };      
      
      const result:string = await authService.signUpManager(inputData);      
      if(result==='error') {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({msg:'sign up failed'});
      }
      return res.status(StatusCodes.OK).json({msg:'OK'});
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
    }
  };

  async verify(req: Request, res: Response): Promise<Response> {
    try {
      await utils.validationErrorHandler(req);
      const {code,email} = req.body;
      const result:string|authResponseData = await authService.verify(email,code);
      if(result==='code is wrong') {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({msg:'code is wrong'});
      }
      return res.status(StatusCodes.CREATED).json({data:result});
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
    }
  };

  async login(req: Request, res: Response): Promise<Response> {
    try {
      await utils.validationErrorHandler(req);
      const {username,password} = req.body;
      const result:authResponseData | string = await authService.login(username,password);
      
      if(result==='wrong username') {
        return res.status(StatusCodes.NOT_FOUND).json({msg:result});
      }
      if(result==='wrong password') {
        return res.status(StatusCodes.FORBIDDEN).json({msg:result});
      }
      return res.status(StatusCodes.OK).json({data:result});
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error});
    }
  };
};

export {AuthController};