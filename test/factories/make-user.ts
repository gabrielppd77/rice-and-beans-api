import { User, UserProps } from '@domain/entities/user';

export function makeUser(override?: Partial<UserProps>) {
  const user = new User({
    email: 'jondoe@email.com',
    name: 'Jon Doe',
    password: '1234',
    phone: '32988886666',
    ...override,
  });

  return user;
}
