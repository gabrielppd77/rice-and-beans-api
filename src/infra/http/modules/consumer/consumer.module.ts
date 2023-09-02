import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';

import { ConsumerController } from '@infra/http/modules/consumer/consumer.controller';

import { ConsumerCompanyGetByUrl } from '@domain/use-cases/consumer/consumer-company-get-by-url';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsumerController],
  providers: [ConsumerCompanyGetByUrl],
})
export class ConsumerModule {}
