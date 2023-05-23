export class FileNotSavedError extends Error {
  constructor(error?: any) {
    super('File Not Saved Error');
    if (error) Error.captureStackTrace(error);
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}
