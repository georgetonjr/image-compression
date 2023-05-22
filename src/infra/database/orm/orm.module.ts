import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomImageRepositoryImplementation } from './repositories/custom-image-repository-implementation';
import {
  CustomImageEntity,
  CustomImageSchema,
} from './schema/custom-image-schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017'),
    MongooseModule.forFeature([
      { name: CustomImageEntity.name, schema: CustomImageSchema },
    ]),
  ],
  providers: [
    {
      provide: 'CustomImageRepository',
      useClass: CustomImageRepositoryImplementation,
    },
  ],
  exports: [
    {
      provide: 'CustomImageRepository',
      useClass: CustomImageRepositoryImplementation,
    },
  ],
})
export class OrmModule {}
