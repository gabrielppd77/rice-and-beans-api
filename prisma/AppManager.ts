import { AppModule } from '@infra/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

export class AppManager {
  private static app: INestApplication;

  public static async startApp() {
    if (!this.app) {
      this.app = await NestFactory.create(AppModule);

      //validation class-validator and dtos. Melhorarrr isso aquiiiiiiiiiiiii
      this.app.useGlobalPipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      );

      await this.app.init();
    }
  }

  public static async stopApp() {
    await this.app.close();
  }

  public static getApp() {
    return this.app;
  }
}
