import { Module } from '@nestjs/common';
import { SaveImageUsecase } from './usecase/save-image.usecase';
import { SaveImageController } from './controller/save-image.controller';
import { StorageImplementation } from './external/storage-implementation';
import { ExifImplementation } from './external/exif-impelmentation';
import { DatabaseModule } from 'src/infra/database.module';

@Module({
  controllers: [SaveImageController],
  imports: [DatabaseModule],
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
