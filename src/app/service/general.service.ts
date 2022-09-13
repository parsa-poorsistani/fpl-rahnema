import { IPlayer } from "../Interface/player.interface";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../Types/response.type";

export const paginationResponseToFront = async (
  response: paginateResponseType
): Promise<paginateResponseToFrontType> => {
  let newResponse: paginateResponseToFrontType = {
    data: response.docs as IPlayer[],
    total: response.total,
    limit: response.limit,
    page: response.page,
    pages: response.pages,
  };
  return newResponse;
};
