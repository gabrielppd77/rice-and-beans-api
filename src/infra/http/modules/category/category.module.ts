import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { CategoryController } from './category.controller';

import { CategoryCreate } from '@domain/use-cases/category/category-create';
import { CategoryById } from '@domain/use-cases/category/category-by-id';
import { CategoryDelete } from '@domain/use-cases/category/category-delete';
import { CategoryList } from '@domain/use-cases/category/category-list';
import { CategoryUpdate } from '@domain/use-cases/category/category-update';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CategoryController],
  providers: [
    CategoryCreate,
    CategoryById,
    CategoryDelete,
    CategoryList,
    CategoryUpdate,
  ],
})
export class CategoryModule {}
