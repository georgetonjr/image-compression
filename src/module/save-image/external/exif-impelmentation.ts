import { Injectable } from '@nestjs/common';
import { Exif } from '../domain/services/exif';
import ExifReader from 'exifreader';

@Injectable()
export class ExifImplementation implements Exif {
  get(imageBuffer: ArrayBuffer): Record<string, unknown> {
    return ExifReader.load(imageBuffer);
  }
}
