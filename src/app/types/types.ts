import mongoose from "mongoose";


type objId = mongoose.Types.ObjectId;

export type connectionResponse = {
    managerId:objId,
    following:boolean,
    first_name:string,
    last_name:string,
    img:any
};

type signInputData = {
    email:string,
    country:string,
    first_name:string,
    last_name:string,
    username:string,
    password:string
};

type authResponseData = {
    manager:objId,
    token:string
};

type managerSignUpType = {
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    country: string,
    teamId: objId,
    email: string,
};

type substitution = {
    in:objId,
    out:objId
};

export {objId,managerSignUpType,signInputData,authResponseData,substitution};
