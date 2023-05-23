export class UnexpectedError extends Error {
  constructor(error?: any) {
    super('Unexpected Error');
    if (error) Error.captureStackTrace(error);
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}
