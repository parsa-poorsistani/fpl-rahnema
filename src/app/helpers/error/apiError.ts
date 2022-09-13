class ApiError extends Error {
  error: string;
  status: Number;

  constructor(error: string, status: Number) {
    super();
    this.error = error;
    this.status = status;
  }
}

export { ApiError };
