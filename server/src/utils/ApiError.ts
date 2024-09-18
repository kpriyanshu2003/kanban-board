import { ErrorData } from "../@types/index.types";

class ApiError extends Error {
  statusCode: number;
  errors: any[];
  data: ErrorData | null;

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;

    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}

export { ApiError };