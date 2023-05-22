import { IsNumber, IsString } from 'class-validator';
import { SaveImagePayload } from '../../domain/save-image-payload';

export class SaveImageValidator implements SaveImagePayload {
  @IsString({
    message: 'image should be a string',
  })
  image: string;
  @IsNumber()
  compression: number;
}
