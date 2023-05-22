export interface Storage {
  save(data: Buffer, fileName: string, path?: string): void;
}
