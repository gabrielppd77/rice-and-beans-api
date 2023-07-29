import { User as UserPrisma, Company as CompanyPrisma } from '@prisma/client';
import { User } from '@domain/entities/user';
import { PrismaCompanyMapper } from './prisma-company.mapper';

interface UserPrismaIncluded extends UserPrisma {
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
    };
  }

  static toDomain(user: UserPrismaIncluded): User {
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
