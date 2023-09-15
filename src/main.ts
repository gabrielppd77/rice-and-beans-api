import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';

import { AppModule } from '@infra/app.module';

import { SwaggerConfig } from './infra/config/swagger.config';
import { ValidationPipeConfig } from './infra/config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.createDocument(app);
  ValidationPipeConfig.configGlobalPipes(app);

  app.use('/public', express.static(join(__dirname, '..', '..', 'public')));

  app.enableCors();

  await app.listen(process.env.APP_PORT);
}
bootstrap();
