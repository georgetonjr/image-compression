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
import { UnsupportedImageFormatError } from '../errors/unsupported-image-format-error';
import { FileNotSavedError } from '../errors/file-not-saved-error';
import { ImageNotFoundError } from '../errors/image-not-found-error';
import { UnexpectedError } from '../errors/unexpected-error';

@Controller('save/image')
export class SaveImageController {
  constructor(
    @Inject('SaveImageUsecase')
    private usecase: SaveImageUsecase,
  ) {}

  private mapError(err: Error, res: Response) {
    switch (err.constructor) {
      case UnsupportedImageFormatError:
        return res.status(400).json({
          errors: [
            {
              code: '400',
              message: 'Invalid image format',
            },
          ],
        });
      case FileNotSavedError:
        return res.status(400).json({
          errors: [
            {
              code: '400',
              message: 'Error when trying to save file.',
            },
          ],
        });
      case UnexpectedError:
        return res.status(400).json({
          errors: [
            {
              code: '400',
              message: err.message || 'unexpected error',
            },
          ],
        });
      case ImageNotFoundError:
        return res.status(404).json({
          errors: [
            {
              code: '404',
              message: 'Image not found.',
            },
          ],
        });
      default:
        return res.status(500).json({
          errors: [
            {
              code: '500',
              message: err.message || 'Internal Server Error',
            },
          ],
        });
    }
  }

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
      const result = await this.usecase.execute(body);
      res.status(201).json(result);
    } catch (error) {
      return this.mapError(error, res);
    }
  }
}
