import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { UserController } from './controllers/user.controller';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { AppController } from './controllers/app.controller';

import { UserLogin } from '@domain/use-cases/user/user-login';
import { UserCreate } from '@domain/use-cases/user/user-create';
import { CategoryCreate } from '@domain/use-cases/category/category-create';
import { ProductCreate } from '@domain/use-cases/product/product-create';
import { ListCategoriesAndProducts } from '@domain/use-cases/app/list-categories-and-products';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [
    UserController,
    CategoryController,
    ProductController,
    AppController,
  ],
  providers: [
    UserLogin,
    UserCreate,
    CategoryCreate,
    ProductCreate,
    ListCategoriesAndProducts,
  ],
})
export class HttpModule {}
