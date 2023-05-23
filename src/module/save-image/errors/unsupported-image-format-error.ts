export class UnsupportedImageFormatError extends Error {
  constructor() {
    super('Unsupported Image Format Error');
    Object.defineProperty(this, 'message', { enumerable: true });
  }
}
