import {Request,Response} from 'express';
import { authResponseData, signInputData } from '../types/types';

interface IauthController {
    signUpManager(req:Request,res:Response):Promise<Response>;
    verify(req:Request,res:Response):Promise<Response>;
    login(req:Request,res:Response):Promise<Response>;
};

interface IauthService {
    signUpManager(input:signInputData):Promise<string>;
    verify(email:string,code:string):Promise<authResponseData | string>;
    login(username:string,password:string):Promise<authResponseData | string>;
};

export {IauthController,IauthService};