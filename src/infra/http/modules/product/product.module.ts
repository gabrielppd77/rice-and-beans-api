import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { ProductController } from './product.controller';

import { ProductCreate } from '@domain/use-cases/product/product-create';
import { ProductById } from '@domain/use-cases/product/product-by-id';
import { ProductDelete } from '@domain/use-cases/product/product-delete';
import { ProductList } from '@domain/use-cases/product/product-list';
import { ProductUpdate } from '@domain/use-cases/product/product-update';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProductController],
  providers: [
    ProductCreate,
    ProductById,
    ProductDelete,
    ProductList,
    ProductUpdate,
  ],
})
export class ProductModule {}
