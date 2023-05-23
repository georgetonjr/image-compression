import { CustomImage } from './custom-image';

describe('Custom Image', () => {
  let sut: CustomImage;
  beforeEach(() => {
    sut = new CustomImage('teste', 1200, 800, {});
  });

  test('should call resize and receive different values for height and width', () => {
    sut.resize();
    expect(sut.getHeight()).not.toEqual(1200);
    expect(sut.getWidth()).not.toEqual(800);
  });

  test('should call resize and receive the same passed values', () => {
    const customImage = new CustomImage('teste', 720, 5420, {});
    customImage.resize();
    expect(customImage.getHeight()).not.toEqual(720);
    expect(customImage.getWidth()).not.toEqual(540);
  });

  test('should call generateDto and receive CustomImageDto object', () => {
    const dto = sut.generateDto();
    expect(dto).toHaveProperty('height');
    expect(dto).toHaveProperty('width');
    expect(dto).toHaveProperty('exif');
    expect(dto).toHaveProperty('name');
  });


  test('should call getName and receive a name', () => {
    expect(sut.getName()).toEqual('teste');
  });
});
