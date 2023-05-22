import { Injectable } from '@nestjs/common';
import { Storage } from '../domain/services/storage';
import * as fs from 'fs';

@Injectable()
export class StorageImplementation implements Storage {
  save(data: Buffer, fileName: string, path?: string): void {
    fs.writeFileSync(`${path || __dirname}/${fileName}`, data);
  }
}
