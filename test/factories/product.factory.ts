import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class ProductFactory {
  static async generateProduct(
    app: INestApplication,
    access_token: string,
    categoryId: string,
  ): Promise<void> {
    await request(app.getHttpServer())
      .post('/product')
      .send({
        categoryId,
        name: 'Product Name',
        price: 99.99,
        description: 'description',
      })
      .set('Authorization', `Bearer ${access_token}`);
  }
}
