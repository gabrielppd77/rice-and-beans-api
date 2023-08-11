import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { ProductController } from './product.controller';

import { ProductCreate } from '@domain/use-cases/product/product-create';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductCreate],
})
export class ProductModule {}
