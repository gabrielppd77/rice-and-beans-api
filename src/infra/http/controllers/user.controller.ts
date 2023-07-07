import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@infra/http/decorators/public.decorator';

import { UserLogin } from '@app/use-cases/user-login';

import { UserLoginDTO } from '../dtos/user-login.dto';

@Controller('user')
export class UserController {
  constructor(private userLogin: UserLogin) {}

  @Public()
  @Post('login')
  async login(@Body() body: UserLoginDTO) {
    const { email, password } = body;

    const { access_token } = await this.userLogin.execute({
      email,
      password,
    });

    return {
      statusCode: 201,
      message: 'Usuário logado com sucesso.',
      data: { access_token },
    };
  }
}
