import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class InternalServerError extends BaseError {
  constructor(msg: string) {
    super(msg, StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
  }
}
