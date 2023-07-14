import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { UserController } from './controllers/user.controller';
import { WelcomeController } from './controllers/welcome.cotroller';

import { UserLogin } from '@domain/use-cases/user-login';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController, WelcomeController],
  providers: [UserLogin],
})
export class HttpModule {}
