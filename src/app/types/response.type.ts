import { IPlayer } from "../interface/player.interface";

export type generalResponseType = {
  msg: String;
  status: Number;
};

export type paginateResponseType = {
  docs: IPlayer[];
  total: Number;
  limit: Number;
  page: Number;
  pages: Number;
};

export type paginateResponseToFrontType = {
  array: IPlayer[];
  total: Number;
  limit: Number;
  page: Number;
  pages: Number;
};
