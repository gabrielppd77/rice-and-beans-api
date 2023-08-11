import { Module } from '@nestjs/common';

import { AppModule } from './modules/app/app.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [AppModule, UserModule, CategoryModule, ProductModule],
  controllers: [],
  providers: [],
})
export class HttpModule {}
