import { mock, mockReset } from 'jest-mock-extended';
import { SaveImageUsecase } from './save-image.usecase';
import { Exif } from '../domain/services/exif';
import exifResponse from '../external/mock/exif-response-mock';
import { CustomImageRepository } from '../domain/repository/custom-image-repository';
import { Storage } from '../domain/services/storage';
import { SaveImagePayload } from '../domain/save-image-payload';
import { UnsupportedImageFormatError } from '../errors/unsupported-image-format-error';
import { FileNotSavedError } from '../errors/file-not-saved-error';
import { ImageNotFoundError } from '../errors/image-not-found-error';
import { UnexpectedError } from '../errors/unexpected-error';

const mockStorage = mock<Storage>();
const mockExif = mock<Exif>();
const mockRepository = mock<CustomImageRepository>();

const makeSut = () =>
  new SaveImageUsecase(mockStorage, mockExif, mockRepository);
const payload: SaveImagePayload = {
  image:
    'https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg',
  compression: 0.9,
};

describe('Save Image Usecase', () => {
  let sut: SaveImageUsecase;
  beforeEach(() => {
    sut = makeSut();
    mockReset(mockStorage);
    mockReset(mockExif);
    mockReset(mockRepository);
  });

  test('Should call execute with success', async () => {
    mockExif.get.mockReturnValue(exifResponse);
    const response = await sut.execute(payload);
    expect(mockStorage.save).toHaveBeenCalledTimes(2);
    expect(mockExif.get).toHaveBeenCalledTimes(1);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
    expect(response).toHaveProperty('localpath');
    expect(response).toHaveProperty('metadata');
  });

  test('Should call execute with UnsupportedImageFormatError', async () => {
    mockExif.get.mockReturnValue(exifResponse);
    try {
      payload.image =
        'https://www.filhao.com.br/noticia/adicionais/90-66-criando-arte-com-inteligencia-artificial-midjourney-e-outras.png';
      await sut.execute(payload);
    } catch (error) {
      expect(mockStorage.save).toHaveBeenCalledTimes(0);
      expect(mockExif.get).toHaveBeenCalledTimes(0);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(UnsupportedImageFormatError);
    }
  });

  test('Should call execute with ImageNotFoundError', async () => {
    try {
      payload.image = 'https://www.google.com/imageerror.jpg';
      await sut.execute(payload);
    } catch (error) {
      expect(mockStorage.save).toHaveBeenCalledTimes(0);
      expect(mockExif.get).toHaveBeenCalledTimes(0);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(ImageNotFoundError);
    }
  });

  test('Should call execute with UnexpectedError', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error());
    try {
      await sut.execute(payload);
    } catch (error) {
      expect(mockStorage.save).toHaveBeenCalledTimes(0);
      expect(mockExif.get).toHaveBeenCalledTimes(0);
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(UnexpectedError);
    }
  });
});
