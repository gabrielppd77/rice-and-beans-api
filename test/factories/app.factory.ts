import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ValidationPipeConfig } from '../../src/config/validation-pipe.config';

export class AppFactory {
  public static async startApp(module): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [module],
    }).compile();
    const app = moduleFixture.createNestApplication();

    ValidationPipeConfig.configGlobalPipes(app);

    app.enableCors();

    await app.init();
    return app;
  }
}
