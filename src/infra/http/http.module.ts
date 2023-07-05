import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { UserController } from './controllers/user.controller';

import { UserCreate } from '@app/use-cases/user-create';
import { UserLogin } from '@app/use-cases/user-login';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [UserCreate, UserLogin],
})
export class HttpModule {}
