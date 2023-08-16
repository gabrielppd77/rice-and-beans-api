import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class LoginFactory {
  static async generateToken(app: INestApplication): Promise<string> {
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
    return response.body.access_token;
  }
}
