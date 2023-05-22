import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomImageEntity } from '../schema/custom-image-schema';
import { Model } from 'mongoose';
import { CustomImageRepository } from 'src/module/save-image/domain/repository/custom-image-repository';
import { CustomImageDto } from 'src/module/save-image/domain/custom-image-dto';
import { CustomImage } from 'src/module/save-image/domain/entity/custom-image';

@Injectable()
export class CustomImageRepositoryImplementation
  implements CustomImageRepository
{
  constructor(
    @InjectModel(CustomImageEntity.name)
    private customImageModel: Model<CustomImageEntity>,
  ) {}

  async save(customImageDto: CustomImageDto): Promise<CustomImage> {
    const customImage = new this.customImageModel(customImageDto);

    await customImage.save();
    return new CustomImage(
      customImage.name,
      customImage.height,
      customImage.width,
      customImage.exif,
      customImage.id,
    );
  }
}
