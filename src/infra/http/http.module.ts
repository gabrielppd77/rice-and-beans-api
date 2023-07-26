import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { UserController } from './controllers/user.controller';
import { CategoryController } from './controllers/category.controller';

import { UserLogin } from '@domain/use-cases/user-login';
import { UserCreate } from '@domain/use-cases/user-create';
import { CategoryCreate } from '@domain/use-cases/category-create';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController, CategoryController],
  providers: [UserLogin, UserCreate, CategoryCreate],
})
export class HttpModule {}
