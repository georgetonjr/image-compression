import { mock, mockReset } from 'jest-mock-extended';
import { SaveImageUsecase } from '../usecase/save-image.usecase';
import { SaveImageController } from './save-image.controller';
import { getMockRes } from '@jest-mock/express';
import { SaveImagePayload } from '../domain/save-image-payload';
import { UnsupportedImageFormatError } from '../errors/unsupported-image-format-error';
import { FileNotSavedError } from '../errors/file-not-saved-error';
import { ImageNotFoundError } from '../errors/image-not-found-error';
import { UnexpectedError } from '../errors/unexpected-error';

const mockUsecase = mock<SaveImageUsecase>();
const { res: response } = getMockRes();
const body: SaveImagePayload = {
  image:
    'https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg',
  compression: 0.9,
};

const mockUsecaseResponse = {
  localpath: {
    original: '/original/mocked.jpg',
    thumb: '/thumb/mocked_thumb.jpg',
  },
  metadata: {},
};

describe('AppController', () => {
  let sut: SaveImageController;
  beforeEach(() => {
    sut = new SaveImageController(mockUsecase);
    mockReset(mockUsecase);
  });

  test('Should call handle with success', async () => {
    mockUsecase.execute.mockResolvedValue(mockUsecaseResponse);
    await sut.handle(response, body);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(mockUsecaseResponse);
  });

  test('Should call handle with UnsupportedImageFormatError', async () => {
    mockUsecase.execute.mockRejectedValue(new UnsupportedImageFormatError());
    await sut.handle(response, body);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    // expect(response.status).toHaveBeenCalledTimes(1);
    // expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith(mockUsecaseResponse);
  });

  test('Should call handle with FileNotSavedError', async () => {
    mockUsecase.execute.mockRejectedValue(new FileNotSavedError());
    await sut.handle(response, body);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    // expect(response.status).toHaveBeenCalledTimes(1);
    // expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith(mockUsecaseResponse);
  });

  test('Should call handle with ImageNotFoundError', async () => {
    mockUsecase.execute.mockRejectedValue(new ImageNotFoundError());
    await sut.handle(response, body);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    // expect(response.status).toHaveBeenCalledTimes(1);
    // expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith(mockUsecaseResponse);
  });

  test('Should call handle with UnexpectedError', async () => {
    mockUsecase.execute.mockRejectedValue(new UnexpectedError());
    await sut.handle(response, body);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    // expect(response.status).toHaveBeenCalledTimes(1);
    // expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith(mockUsecaseResponse);
  });

  test('Should call handle with status 500', async () => {
    mockUsecase.execute.mockRejectedValue(new Error('Internal Server Error'));
    await sut.handle(response, body);
    expect(mockUsecase.execute).toHaveBeenCalledTimes(1);
    // expect(response.status).toHaveBeenCalledTimes(1);
    // expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith(mockUsecaseResponse);
  });
});
