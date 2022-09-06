interface IError {
  value: any;
  msg: String;
  param: String;
  location: String;
}

class ValidationError extends Error {
  errors: any[];
  status: Number;

  constructor(errors: any[], status: Number) {
    super();
    this.errors = errors;
    this.status = status;
  }
}

export { ValidationError };
