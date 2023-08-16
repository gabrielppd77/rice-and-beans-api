import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipeConfig } from '../../src/config/validation-pipe.config';

import { AppModule } from '@infra/app.module';

export class AppFactory {
  public static async startApp(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();

    ValidationPipeConfig.configGlobalPipes(app);

    app.enableCors();

    await app.init();
    return app;
  }
}
