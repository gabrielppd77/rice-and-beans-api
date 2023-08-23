import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';

import { AppController } from '@infra/http/modules/app/app.controller';

import { AppCompanyGetByUrl } from '@domain/use-cases/app/app-company-get-by-url';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppCompanyGetByUrl],
})
export class AppModule {}
