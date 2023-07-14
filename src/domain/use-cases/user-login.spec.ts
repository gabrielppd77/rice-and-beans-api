import { JwtService } from '@nestjs/jwt';

import { InMemoryUserRepository } from '@test/repositories/in-memory-user.repository';

import { UserLogin } from './user-login';
import { UserCreate } from './user-create';

import { EmailOrPasswordIncorrectException } from './exceptions/email-or-password-incorrect.exception';

const JWT_SECRET = 'JWT_SECRET_FOR_TEST';

describe('UserLogin', () => {
  it('should be able to show an error when pass the incorrect email', async () => {
    const userRepository = new InMemoryUserRepository();
    const userCreate = new UserCreate(userRepository);
    const jwtService = new JwtService({
      secret: JWT_SECRET,
    });
    const userLogin = new UserLogin(userRepository, jwtService);

    const userToCreate = {
      email: 'email@correct.com',
      password: '1234',
    };

    await userCreate.execute(userToCreate);

    expect(
      async () =>
        await userLogin.execute({
          email: 'email@incorrect.com',
          password: userToCreate.password,
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });

  it('should be able to show an error when pass the incorrect password', async () => {
    const userRepository = new InMemoryUserRepository();
    const userCreate = new UserCreate(userRepository);
    const jwtService = new JwtService({
      secret: JWT_SECRET,
    });
    const userLogin = new UserLogin(userRepository, jwtService);

    const userToCreate = {
      email: 'email@correct.com',
      password: '12345678',
    };

    await userCreate.execute(userToCreate);

    expect(
      async () =>
        await userLogin.execute({
          email: userToCreate.email,
          password: 'incorrect-password',
        }),
    ).rejects.toThrow(EmailOrPasswordIncorrectException);
  });

  it('should be able to log-in an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const userCreate = new UserCreate(userRepository);
    const jwtService = new JwtService({
      secret: JWT_SECRET,
    });
    const userLogin = new UserLogin(userRepository, jwtService);

    const userToCreate = {
      email: 'email@emailvalid.com',
      password: '1234',
      name: 'Jon Doe',
    };

    await userCreate.execute(userToCreate);

    const { access_token } = await userLogin.execute({
      email: userToCreate.email,
      password: userToCreate.password,
    });

    expect(access_token).toBeDefined();
  });
});
