import { NestFactory } from '@nestjs/core';
import { AppModule } from '@infra/app.module';

import { SwaggerConfig } from './config/swagger.config';
import { ValidationPipeConfig } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.createDocument(app);
  ValidationPipeConfig.configGlobalPipes(app);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
