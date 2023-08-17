import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class CategoryFactory {
  static async generateCategory(
    app: INestApplication,
    access_token: string,
  ): Promise<string> {
    await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'category-name',
        photoUrl: 'photo-url',
      })
      .set('Authorization', `Bearer ${access_token}`);

    const responseListCategories = await request(app.getHttpServer())
      .get('/category')
      .set('Authorization', `Bearer ${access_token}`);

    return responseListCategories.body[0].id;
  }
}
