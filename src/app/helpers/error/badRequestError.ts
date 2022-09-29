import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends BaseError {
  constructor(msg: string) {
    super(msg, StatusCodes.BAD_REQUEST, "Bad Request Error");
  }
}
