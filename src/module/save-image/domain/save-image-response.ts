export interface LocalPath {
  original: string;
  thumb?: string;
}

export interface SaveImageResponse {
  success: boolean;
  data?: {
    localpath: LocalPath;
    metadata: Record<string, unknown>;
  };
  errors?: {
    code: string;
    message: string;
  }[];
}
