import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { readFileSync } from 'fs';
import { join } from 'path';

const filePath = join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  'test',
  'files',
  'image.png',
);
const fileBuffer = readFileSync(filePath);

import { AppFactory } from '@test/factories/app.factory';
import { LoginFactory } from '@test/factories/login.factory';
import { CategoryFactory } from '@test/factories/category.factory';

describe('ProductController', () => {
  let app: INestApplication;
  let access_token: string;
  let categoryId: string;
  let otherCategoryId: string;

  let product: any;

  beforeAll(async () => {
    app = await AppFactory.startApp();

    access_token = await LoginFactory.generateToken(app);
    categoryId = await CategoryFactory.generateCategory(app, access_token);
    otherCategoryId = await CategoryFactory.generateCategory(app, access_token);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a product', async () => {
    const response = await request(app.getHttpServer())
      .post('/product')
      .send({
        categoryId,
        name: 'product1',
        price: 99.99,
        description: 'description',
      })
      .set('Authorization', `Bearer ${access_token}`);
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('should list all products', async () => {
    const response = await request(app.getHttpServer())
      .get('/product')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeTruthy();

    product = response.body[0];

    expect(product.id).toBeTruthy();
    expect(product.name).toBeTruthy();
    expect(product.price).toBeTruthy();
    expect(product.order).toEqual(1);
  });

  it('should get a product', async () => {
    const response = await request(app.getHttpServer())
      .get('/product/' + product.id)
      .set('Authorization', `Bearer ${access_token}`);

    const productCurrent = response.body;

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeTruthy();

    expect(productCurrent.id).toBeTruthy();
    expect(productCurrent.id).toEqual(product.id);
    expect(productCurrent.categoryId).toBeTruthy();
    expect(productCurrent.categoryId).toEqual(categoryId);
    expect(productCurrent.name).toBeTruthy();
    expect(productCurrent.price).toBeTruthy();
    expect(productCurrent.description).toBeTruthy();
    expect(productCurrent.order).toEqual(1);
  });

  it('should update a product', async () => {
    const response = await request(app.getHttpServer())
      .put('/product/' + product.id)
      .send({
        id: product.id,
        categoryId: otherCategoryId,
        name: 'product2',
        price: 40,
        description: 'description-new',
      })
      .set('Authorization', `Bearer ${access_token}`);
    expect(response.status).toBe(HttpStatus.OK);
  });

  it('should update the order of severals products', async () => {
    expect(product.order).toEqual(1);
    const response = await request(app.getHttpServer())
      .patch('/product/update-many-orders')
      .send({
        products: [
          {
            id: product.id,
            order: 2,
          },
        ],
      })
      .set('Authorization', `Bearer ${access_token}`);

    const responseGet = await request(app.getHttpServer())
      .get('/product/' + product.id)
      .set('Authorization', `Bearer ${access_token}`);
    const productCurrent = responseGet.body;

    expect(response.status).toBe(HttpStatus.OK);
    expect(productCurrent.order).toEqual(2);
  });

  it('should list all products of category', async () => {
    const response = await request(app.getHttpServer())
      .get('/product/list-by-category/' + otherCategoryId)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeTruthy();

    product = response.body[0];

    expect(product.id).toBeTruthy();
    expect(product.name).toBeTruthy();
    expect(product.order).toEqual(2);
  });

  it('should upload image of product correctly', async () => {
    const response = await request(app.getHttpServer())
      .patch('/product/upload-image/' + product.id)
      .attach('file', fileBuffer, 'image.png')
      .set('Authorization', `Bearer ${access_token}`);

    const responseGet = await request(app.getHttpServer())
      .get('/product/' + product.id)
      .set('Authorization', `Bearer ${access_token}`);
    const productCurrent = responseGet.body;

    expect(response.status).toBe(HttpStatus.OK);
    expect(productCurrent.imageUrl).toBeTruthy();
  });

  it('should delete a product', async () => {
    const response = await request(app.getHttpServer())
      .delete('/product/' + product.id)
      .set('Authorization', `Bearer ${access_token}`);
    expect(response.status).toBe(HttpStatus.OK);
  });
});
