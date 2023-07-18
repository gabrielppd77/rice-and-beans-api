import { User as UserPrisma } from '@prisma/client';
import { User } from '@domain/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): UserPrisma {
    return {
      id: user.id.toValue(),
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
    };
  }

  static toDomain(user: UserPrisma): User {
    return new User(
      {
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
      user.id,
    );
  }
}
