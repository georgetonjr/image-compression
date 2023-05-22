import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CustomImage } from 'src/module/save-image/domain/entity/custom-image';

export type CustomImageDocument = HydratedDocument<CustomImage>;

@Schema({ collection: 'CustomImage' })
export class CustomImageEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ name: 'height', type: 'Number', required: true })
  height: number;

  @Prop({ name: 'width', type: 'Number', required: true })
  width: number;

  @Prop({ name: 'exif', type: '', required: true })
  exif: string;

  @Prop()
  name: string;

  @Prop()
  format: string;
}

export const CustomImageSchema =
  SchemaFactory.createForClass(CustomImageEntity);
