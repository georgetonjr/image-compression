import { CustomImageDto } from '../custom-image-dto';
import { CustomImage } from '../entity/custom-image';

export interface CustomImageRepository {
  save(customImageDto: CustomImageDto): Promise<CustomImage>;
}
