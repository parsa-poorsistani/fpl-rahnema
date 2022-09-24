export class BaseError extends Error {
  status: Number;

  constructor(msg: string, status: Number) {
    super();
    this.message = msg;
    this.status = status;
  }
}
