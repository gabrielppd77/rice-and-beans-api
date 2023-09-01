import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppFactory } from '@test/factories/app.factory';
import { LoginFactory } from '@test/factories/login.factory';

describe('CategoryController', () => {
  let app: INestApplication;
  let access_token: string;

  let category: any;

  beforeAll(async () => {
    app = await AppFactory.startApp();

    access_token = await LoginFactory.generateToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a category', async () => {
    const response = await request(app.getHttpServer())
      .post('/category')
      .send({
        name: 'category-name',
        photoUrl: 'photo-url',
      })
      .set('Authorization', `Bearer ${access_token}`);
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('should list all categories', async () => {
    const response = await request(app.getHttpServer())
      .get('/category')
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeTruthy();

    category = response.body[0];

    expect(category.id).toBeTruthy();
    expect(category.name).toBeTruthy();
    expect(category.photoUrl).toBeTruthy();
    expect(category.order).toEqual(1);
  });

  it('should get a category', async () => {
    const response = await request(app.getHttpServer())
      .get('/category/' + category.id)
      .set('Authorization', `Bearer ${access_token}`);

    const categoryCurrent = response.body;

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toBeTruthy();

    expect(categoryCurrent.id).toBeTruthy();
    expect(categoryCurrent.id).toEqual(category.id);
    expect(categoryCurrent.name).toBeTruthy();
    expect(categoryCurrent.photoUrl).toBeTruthy();
    expect(categoryCurrent.order).toEqual(1);
  });

  it('should update a category', async () => {
    const response = await request(app.getHttpServer())
      .put('/category/' + category.id)
      .send({
        id: category.id,
        name: 'category-name-new',
        photoUrl: 'photo-url-new',
      })
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(HttpStatus.OK);
  });

  it('should delete a category', async () => {
    const response = await request(app.getHttpServer())
      .delete('/category/' + category.id)
      .set('Authorization', `Bearer ${access_token}`);
    expect(response.status).toBe(HttpStatus.OK);
  });
});
