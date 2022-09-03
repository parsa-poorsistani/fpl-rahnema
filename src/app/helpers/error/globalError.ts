interface IError {
  value: any;
  msg: String;
  param: String;
  location: String;
}

class GlobalError extends Error {
  errors: IError[];
  status: Number;

  constructor(errors: IError[], status: 400) {
    super();
    this.errors = errors;
    this.status = status;
  }
}

export { GlobalError };
