import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SaveImageModule } from '../src/module/save-image/save-image.module';

const requestBody = {
  image:
    'https://assets.storage.trakto.io/AkpvCuxXGMf3npYXajyEZ8A2APn2/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg',
  compression: 0.9,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SaveImageModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/save/image (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/save/image')
      .send(requestBody);

    expect(response.statusCode).toEqual(201);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('localpath');
    expect(response.body).toHaveProperty('metadata');
  });
});
