import { Inject, Injectable } from '@nestjs/common';
import * as Sharp from 'sharp';
import * as path from 'path';
import { CustomImage } from '../domain/entity/custom-image';
import { SaveImagePayload } from '../domain/save-image-payload';
import { LocalPath, SaveImageResponse } from '../domain/save-image-response';
import { Storage } from '../domain/services/storage';
import { Exif } from '../domain/services/exif';
import { CustomImageRepository } from '../domain/repository/custom-image-repository';

@Injectable()
export class SaveImageUsecase {
  constructor(
    @Inject('Storage')
    private readonly storage: Storage,
    @Inject('Exif')
    private readonly exif: Exif,
    @Inject('CustomImageRepository')
    private readonly repository: CustomImageRepository,
  ) {}

  async execute(payload: SaveImagePayload): Promise<SaveImageResponse> {
    try {
      const imageArrayBuffer = await this.fetchimageUrl(payload.image);

      const imageSharp = this.getImageSharp(imageArrayBuffer);
      const imageMetadata = await imageSharp.metadata();
      const imageExif = this.getExif(imageArrayBuffer);

      const customImage = this.buildCustomImage(
        this.getNameFromUrl(payload.image),
        imageMetadata.height,
        imageMetadata.width,
        imageExif,
      );

      const imageSavedInfo = await this.saveImage(
        imageMetadata.height,
        imageMetadata.width,
        customImage,
        imageSharp,
        payload.compression,
      );

      await this.repository.save(customImage.genetateDto());

      return {
        success: true,
        data: {
          localpath: imageSavedInfo,
          metadata: imageExif,
        },
      };
    } catch (error) {
      const errors = [];

      if (error.code === 'ENOENT') {
        errors.push({
          code: '400',
          message: 'Error when trying to save file.',
        });
      } else if (
        error.message === 'Input buffer contains unsupported image format'
      ) {
        errors.push({
          code: '404',
          message: 'Error: image not found.',
        });
      } else {
        errors.push({
          code: error.code || '400',
          message: error.message || 'unexpected error',
        });
      }

      return {
        errors,
        success: false,
      };
    }
  }

  private async saveImage(
    height: number,
    width: number,
    customImage: CustomImage,
    imageSharp: Sharp.Sharp,
    compression: number,
  ) {
    const pathToSave = path.resolve(__dirname, '../../../..', 'assets');
    const imageLocalSaved = {} as LocalPath;

    const buffer = await imageSharp
      .toFormat('jpg', {
        progressive: true,
      })
      .withMetadata()
      .toBuffer();

    this.storage.save(
      buffer,
      `${customImage.getName()}_original.jpg`,
      `${pathToSave}/original`,
    );
    imageLocalSaved.original = `${pathToSave}/original/${customImage.getName()}_original.jpg`;

    if (height > 720 || width > 720) {
      customImage.resize();

      const buffer = await imageSharp
        .resize(customImage.getWidth(), customImage.getHeight(), {
          fit: 'fill',
          withoutEnlargement: true,
        })
        .toFormat('jpg', {
          progressive: true,
          quality: compression * 100,
        })
        .toBuffer();

      this.storage.save(
        buffer,
        `${customImage.getName()}_thumb.jpg`,
        `${pathToSave}/thumb`,
      );

      imageLocalSaved.thumb = `${pathToSave}/original/${customImage.getName()}_thumb.jpg`;
    }

    return imageLocalSaved;
  }

  private getExif(img: ArrayBuffer) {
    return this.exif.get(img);
  }

  private getImageSharp(img: ArrayBuffer) {
    return Sharp(img);
  }

  private buildCustomImage(
    name: string,
    height: number,
    width: number,
    exif: object,
  ) {
    return new CustomImage(name, height, width, JSON.stringify(exif));
  }

  private getNameFromUrl(url: string): string {
    const [imageName, _] = url.split('/').at(-1).split('.');
    return imageName;
  }

  private async fetchimageUrl(imageUrl: string): Promise<ArrayBuffer> {
    return fetch(imageUrl)
      .then((response) => response.blob())
      .then((response) => response.arrayBuffer());
  }
}
