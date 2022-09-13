import { IPlayer } from "../Interface/player.interface";

type playerPaginateResponse = {
  docs: IPlayer[];
  total: Number;
  limit: Number;
  page: Number;
  pages: Number;
};

export { playerPaginateResponse };
