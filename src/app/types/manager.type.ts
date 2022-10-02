import { objId } from "./types";

export type managerUpdateType = {
  fileId: objId;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  country: string;
  email: string;
};
