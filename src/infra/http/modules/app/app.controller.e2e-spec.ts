import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppFactory } from '@test/factories/app.factory';
import { LoginFactory } from '@test/factories/login.factory';
import { CategoryFactory } from '@test/factories/category.factory';
import { ProductFactory } from '@test/factories/product.factory';

describe('AppController', () => {
  let app: INestApplication;
  let access_token: string;
  let categoryId: string;

  beforeAll(async () => {
    app = await AppFactory.startApp();

    access_token = await LoginFactory.generateToken(app);
    categoryId = await CategoryFactory.generateCategory(app, access_token);
    await ProductFactory.generateProduct(app, access_token, categoryId);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list all categories and products of company and the company', async () => {
    const response = await request(app.getHttpServer()).get(
      '/app/company/company-name',
    );

    expect(response.status).toBe(HttpStatus.OK);

    const company = response.body;
    const category = company.categories[0];
    const product = category.products[0];

    expect(company.id).toBeTruthy();
    expect(company.name).toBeTruthy();

    expect(category.id).toBeTruthy();
    expect(category.companyId).toBeTruthy();
    expect(category.companyId).toEqual(company.id);
    expect(category.name).toBeTruthy();

    expect(product.id).toBeTruthy();
    expect(product.categoryId).toBeTruthy();
    expect(product.categoryId).toEqual(category.id);
    expect(product.name).toBeTruthy();
    expect(product.price).toBeTruthy();
    expect(product.photoUrl).toBeTruthy();
    expect(product.description).toBeTruthy();
  });
});
