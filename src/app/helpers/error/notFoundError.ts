import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends BaseError {
  constructor(msg: string) {
    super(msg, StatusCodes.NOT_FOUND, "Not Found Error");
  }
}
