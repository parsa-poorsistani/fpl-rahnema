import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class AccessForbiddenError extends BaseError {
  constructor(msg: string) {
    super(msg, StatusCodes.FORBIDDEN, "Access Forbidden Error");
  }
}
