import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { UserModule } from './user.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        user: {
          email: 'email@email',
          name: 'string',
          password: '1234',
          phone: 'stringstri',
        },
        company: {
          name: 'string',
          phone: 'stringstri',
          description: 'string',
        },
      });

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body.access_token).toBeTruthy();
    expect(typeof response.body.access_token).toEqual('string');
  });

  it('/POST /user/login', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/login')
      .send({
        email: 'email@email',
        password: '1234',
      });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.access_token).toBeTruthy();
    expect(typeof response.body.access_token).toEqual('string');
  });
});
