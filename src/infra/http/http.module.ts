import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { UserController } from './controllers/user.controller';

import { UserLogin } from '@domain/use-cases/user-login';
import { UserCreate } from '@domain/use-cases/user-create';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [UserLogin, UserCreate],
})
export class HttpModule {}
