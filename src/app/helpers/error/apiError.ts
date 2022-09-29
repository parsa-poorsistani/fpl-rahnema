import { BaseError } from "./baseError";

export class ApiError extends BaseError {
  constructor(msg: string, status: number) {
    super(msg, status, "Api Error");
  }
}
