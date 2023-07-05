import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { UserRepository } from '@app/repositories/user.repository';

import { EmailOrPasswordIncorrectException } from './exceptions/email-or-password-incorrect.exception';

interface Request {
  email: string;
  password: string;
}

interface Response {
  access_token: string;
}

@Injectable()
export class UserLogin {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(req: Request): Promise<Response> {
    const { email, password } = req;

    const userFinded = await this.userRepository.findByEmail(email);

    if (!userFinded) throw new EmailOrPasswordIncorrectException();

    const isPasswordValid = await compare(password, userFinded.password);

    if (!isPasswordValid) throw new EmailOrPasswordIncorrectException();

    const payload = { sub: userFinded.id };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
