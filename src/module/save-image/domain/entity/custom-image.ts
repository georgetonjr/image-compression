import { CustomImageDto } from '../custom-image-dto';

export class CustomImage {
  private id: string;
  private height: number;
  private width: number;
  private exif: string;
  private name: string;

  constructor(
    name: string,
    height: number,
    width: number,
    exif: any,
    id?: string,
  ) {
    this.name = name;
    this.height = height;
    this.width = width;
    this.exif = exif;
    this.id = id;
  }

  getHeight(): number {
    return this.height;
  }

  getName(): string {
    return this.name;
  }

  getWidth(): number {
    return this.width;
  }

  genetateDto(): CustomImageDto {
    return Object.assign({} as CustomImageDto, this);
  }

  resize(): void {
    let proportion = 0;

    if (this.height < 720 && this.width < 720) {
      return;
    }

    if (this.height > this.width) {
      proportion = this.height / this.width;
      Reflect.defineProperty(this, 'height', { value: 720 });
      Reflect.defineProperty(this, 'width', { value: 720 / proportion });
    } else if (this.height < this.width) {
      proportion = this.width / this.height;
      Reflect.defineProperty(this, 'height', { value: 720 / proportion });
      Reflect.defineProperty(this, 'width', { value: 720 });
    }
  }
}
