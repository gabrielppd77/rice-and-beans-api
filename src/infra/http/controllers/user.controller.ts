import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '@infra/http/decorators/public.decorator';

import { UserLogin } from '@domain/use-cases/user/user-login';
import { UserCreate } from '@domain/use-cases/user/user-create';

import { UserLoginDTO } from '../dtos/user/user-login.dto';
import { UserCreateDTO } from '../dtos/user/user-create.dto';
import { UserLoginResponseDTO } from '../dtos/user/user-login-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userLogin: UserLogin, private userCreate: UserCreate) {}

  @Public()
  @Post('login')
  async login(@Body() body: UserLoginDTO): Promise<UserLoginResponseDTO> {
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
  async create(@Body() body: UserCreateDTO): Promise<UserLoginResponseDTO> {
    const { user, company } = body;

    const { access_token } = await this.userCreate.execute({
      newUser: user,
      newCompany: company,
    });

    return { access_token };
  }
}
