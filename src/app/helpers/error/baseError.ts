export class BaseError extends Error {
  status: number;

  constructor(msg: string, status: number) {
    super();
    this.message = msg;
    this.status = status;
  }
}
