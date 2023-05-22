export class FileNotSavedError extends Error {
  constructor(message: string) {
    super(message);
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}
