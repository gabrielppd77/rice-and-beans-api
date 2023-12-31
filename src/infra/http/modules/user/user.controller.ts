import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '@infra/http/decorators/public.decorator';

import { UserLogin } from '@domain/use-cases/user/user-login';
import { UserCreate } from '@domain/use-cases/user/user-create';

import { UserLoginDTO, UserLoginResponseDTO } from './dtos/user-login.dto';
import { UserCreateDTO } from './dtos/user-create.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userLogin: UserLogin,
    private userCreate: UserCreate,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
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
  @Post()
  async create(@Body() body: UserCreateDTO): Promise<UserLoginResponseDTO> {
    const { user, company } = body;

    const { access_token } = await this.userCreate.execute({
      newUser: user,
      newCompany: company,
    });

    return { access_token };
  }
}
