import { mockReset } from 'jest-mock-extended';
import { Exif } from '../domain/services/exif';
import { ExifImplementation } from './exif-impelmentation';
import ExifReader from 'exifreader';
import exifResponse from './mock/exif-response-mock';

const makeSut = () => new ExifImplementation();

describe('Exif Implementation', () => {
  const spy = jest.spyOn(ExifReader, 'load').mockResolvedValue(exifResponse);
  let sut: Exif;
  beforeEach(() => {
    sut = makeSut();
    mockReset(spy);
  });

  test('Should call get with success', async () => {
    spy.mockResolvedValue(exifResponse);
    const buf = Buffer.from('teste.jpg');
    const result = await sut.get(buf);
    expect(result).toEqual(exifResponse);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(buf);
  });
});
