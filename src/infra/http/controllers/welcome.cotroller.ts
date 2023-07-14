import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@infra/http/decorators/public.decorator';

import { WelcomeCreate } from '@domain/use-cases/welcome-create';

import { WelcomeCreateDTO } from '../dtos/welcome-create.dto';

@Controller('welcome')
export class WelcomeController {
  constructor(private welcomeCreate: WelcomeCreate) {}

  @Public()
  @Post('create')
  async create(@Body() body: WelcomeCreateDTO) {
    const { company, user } = body;

    await this.welcomeCreate.execute({
      company,
      user,
    });

    // await this.userCreate.execute({ email, password });

    return {
      statusCode: 201,
      message: 'Bem vindo!',
      data: null,
    };
  }
}
