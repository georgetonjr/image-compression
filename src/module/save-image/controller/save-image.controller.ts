import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { SaveImageUsecase } from '../usecase/save-image.usecase';
import { SaveImagePayload } from '../domain/save-image-payload';
import { SaveImageValidator } from './validator/save-image-validator';

@Controller('save/image')
export class SaveImageController {
  constructor(
    @Inject('SaveImageUsecase')
    private usecase: SaveImageUsecase,
  ) {}

  @Post()
  async handle(
    @Res() res: Response,
    @Body(
      new ValidationPipe({
        expectedType: SaveImageValidator,
      }),
    )
    body: SaveImagePayload,
  ) {
    try {
      const { success, data, errors } = await this.usecase.execute(body);
      success ? res.status(201).json(data) : res.status(400).json(errors);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
