import { IPlayer } from "../interface/player.interface";

type playerPaginateResponse = {
  docs: IPlayer[];
  total: Number;
  limit: Number;
  page: Number;
  pages: Number;
};

export { playerPaginateResponse };
