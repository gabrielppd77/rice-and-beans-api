import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppFactory } from '@test/factories/app.factory';

import { UserModule } from './user.module';

describe('UserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await AppFactory.startApp(UserModule);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST /user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        user: {
          email: 'email@email.com',
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
  });

  it('/POST /user/login', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/login')
      .send({
        email: 'email@email.com',
        password: '1234',
      });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.access_token).toBeTruthy();
  });
});
