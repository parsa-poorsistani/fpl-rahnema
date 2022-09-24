import { BaseError } from "./baseError";

class ValidationError extends BaseError {
  errors: any[];

  constructor(errors: any[], msg: string, status: number) {
    super(msg, status);
    this.errors = errors;
  }
}

export { ValidationError };
