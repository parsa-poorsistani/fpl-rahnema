import { BaseError } from "./baseError";

export class ApiError extends BaseError {
  constructor(msg: string, status: Number) {
    super(msg, status);
  }
}
