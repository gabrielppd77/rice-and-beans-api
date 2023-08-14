import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '@infra/app.module';
import { UserLoginResponseDTO } from './dtos/user-login-response.dto';
import { AppManager } from '../../../../../prisma/AppManager';

describe('AppController (e2e)', () => {
  // let app: INestApplication;

  // beforeAll(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  // afterAll(async () => {
  //   await app.close();
  // });

  it('/POST user', async () => {
    const app = AppManager.getApp();
    console.log({ app });
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        user: {
          email: 'string',
          name: 'string',
          password: 'string',
          phone: 'stringstri',
        },
        company: {
          name: 'string',
          phone: 'stringstri',
          description: 'string',
        },
      });

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toEqual(UserLoginResponseDTO);
  });
});
