import mongoose from "mongoose";

type objId = mongoose.Types.ObjectId;

export type connectionResponse = {
  managerId: objId;
  following: boolean;
  first_name: string;
  last_name: string;
  img: any;
};

type signInputData = {
  email: string;
  country: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
};

type authResponseData = {
  manager: objId;
  token: string;
};

type managerSignUpType = {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  country: string;
  teamId: objId;
  email: string;
};

type feedCreationType = {
  managerId: objId;
  points: number;
  substitutions: Array<substitution> | null;
  event: objId;
};

type substitution = {
  in: objId;
  out: objId;
};

export type substitutionRsponse = {
  in: String;
  out: String;
};

export type feedDisplay = {
  points: number;
  event: number;
  managerId?: objId;
  substitutions: Array<substitutionRsponse> | null;
  is_liked: boolean;
  first_name: string;
  last_name: string;
  feedId?: objId;
};

export type repoReponseType = {
  success: boolean;
};

export {
  objId,
  managerSignUpType,
  signInputData,
  authResponseData,
  substitution,
  feedCreationType,
};
