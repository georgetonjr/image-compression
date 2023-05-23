import { Module } from '@nestjs/common';
import { SaveImageUsecase } from './usecase/save-image.usecase';
import { SaveImageController } from './controller/save-image.controller';
import { StorageImplementation } from './external/storage-implementation';
import { ExifImplementation } from './external/exif-impelmentation';
import { DatabaseModule } from '../../infra/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SaveImageController],
  providers: [
    {
      provide: 'SaveImageUsecase',
      useClass: SaveImageUsecase,
    },
    {
      provide: 'Storage',
      useClass: StorageImplementation,
    },
    {
      provide: 'Exif',
      useClass: ExifImplementation,
    },
  ],
})
export class SaveImageModule {}
