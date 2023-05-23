export class ImageNotFoundError extends Error {
  constructor(error?: any) {
    super('Image Not Found Error');
    if (error) Error.captureStackTrace(error);
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}
