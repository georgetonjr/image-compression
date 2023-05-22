export interface Exif {
  get(imageBuffer: ArrayBuffer): Record<string, any>;
}
