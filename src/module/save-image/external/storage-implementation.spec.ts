import * as fs from 'fs';
import { StorageImplementation } from './storage-implementation';
import { Storage } from '../domain/services/storage';

const makeSut = () => new StorageImplementation();

describe('Storage Implementation', () => {
  let sut: Storage;
  beforeEach(() => {
    sut = makeSut();
  });

  test('Should call save with success', () => {
    const spy = jest.spyOn(fs, 'writeFileSync');
    const buf = Buffer.from('teste.jpg');

    sut.save(buf, 'teste.jpg');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`${__dirname}/teste.jpg`, buf);
  });

  test('Should call save with Error', () => {
    const spy = jest.spyOn(fs, 'writeFileSync');
    const buf = Buffer.from('teste.jpg');
    try {
      sut.save(buf, 'teste.jpg', 'teste/error');
    } catch (error) {
      expect(error.code).toBe('ENOENT');
      expect(error.message).toBe(
        "ENOENT: no such file or directory, open 'teste/error/teste.jpg'",
      );
      expect(spy).toHaveBeenCalled();
    }
  });
});
