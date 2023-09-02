import { Module } from '@nestjs/common';

import { ConsumerModule } from './modules/consumer/consumer.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ConsumerModule, UserModule, CategoryModule, ProductModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
