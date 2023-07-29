import {
  User as UserPrismaMain,
  Company as CompanyPrisma,
} from '@prisma/client';
import { User } from '@domain/entities/user';
import { PrismaCompanyMapper } from './prisma-company.mapper';

interface UserPrisma extends UserPrismaMain {
  company?: CompanyPrisma;
}

export class PrismaUserMapper {
  static toPrisma(user: User): UserPrisma {
    return {
      id: user.id.toValue(),
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      company: user.company
        ? PrismaCompanyMapper.toPrisma(user.company)
        : undefined,
    };
  }

  static toDomain(user: UserPrisma): User {
    return new User(
      {
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: user.password,
        company: user.company
          ? PrismaCompanyMapper.toDomain(user.company)
          : undefined,
      },
      user.id,
    );
  }
}
