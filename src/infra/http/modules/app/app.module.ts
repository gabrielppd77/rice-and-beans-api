import { Module } from '@nestjs/common';

import { AppController } from '@infra/http/modules/app/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
