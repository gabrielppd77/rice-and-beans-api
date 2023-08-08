import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserRepository } from '@domain/repositories/user.repository';

import { User } from '../../entities/user';
import { Company } from '../../entities/company';

import { EmailInUseException } from '../../exceptions/email-in-use.exception';
import { UserLogin } from './user-login';

interface UserRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
}

interface CompanyRequest {
  name: string;
  phone?: string;
  description?: string;
}

interface Request {
  newUser: UserRequest;
  newCompany: CompanyRequest;
}

interface Response {
  access_token: string;
}

@Injectable()
export class UserCreate {
  constructor(
    private userRepository: UserRepository,
    private userLogin: UserLogin,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { newUser, newCompany } = request;

    const userFinded = await this.userRepository.findByEmail(newUser.email);

    if (userFinded) throw new EmailInUseException();

    const hashPassword = await hash(newUser.password, 10);

    const user = new User({
      email: newUser.email,
      name: newUser.name,
      password: hashPassword,
      phone: newUser.phone,
    });

    const company = new Company({
      name: newCompany.name,
      description: newCompany.description,
      phone: newCompany.phone,
      userId: user.id,
    });

    await this.userRepository.create(user, company);

    const { access_token } = await this.userLogin.execute({
      email: newUser.email,
      password: newUser.password,
    });

    return { access_token };
  }
}
