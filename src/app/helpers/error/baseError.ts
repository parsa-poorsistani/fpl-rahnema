export class BaseError extends Error {
  status: number;
  type: string;
  constructor(msg: string, status: number, type: string) {
    super();
    this.message = msg;
    this.status = status;
    this.type = type;
  }
}
