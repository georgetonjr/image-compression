export interface LocalPath {
  original: string;
  thumb?: string;
}

export interface SaveImageResponse {
  localpath: LocalPath;
  metadata: Record<string, unknown>;
}
