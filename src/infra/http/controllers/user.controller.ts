import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { Public } from '@infra/http/decorators/public.decorator';

import { UserLogin } from '@domain/use-cases/user-login';
import { UserCreate } from '@domain/use-cases/user-create';

import { UserLoginDTO } from '../dtos/user-login.dto';
import { UserCreateDTO } from '../dtos/user-create.dto';

@Controller('user')
export class UserController {
  constructor(private userLogin: UserLogin, private userCreate: UserCreate) {}

  @Public()
  @Post('login')
  async login(@Body() body: UserLoginDTO) {
    const { email, password } = body;

    const { access_token } = await this.userLogin.execute({
      email,
      password,
    });

    return { access_token };
  }

  @Public()
  @HttpCode(201)
  @Post('create')
  async create(@Body() body: UserCreateDTO) {
    const { user, company } = body;

    await this.userCreate.execute({
      newUser: user,
      newCompany: company,
    });
  }
}
