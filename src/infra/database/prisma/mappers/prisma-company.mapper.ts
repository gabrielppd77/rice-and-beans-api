import {
  Category as CategoryPrisma,
  Company as CompanyPrisma,
  User as UserPrisma,
} from '@prisma/client';
import { Company } from '@domain/entities/company';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { PrismaCategoryMapper } from './prisma-category.mapper';
import { PrismaUserMapper } from './prisma-user.mapper';

interface CompanyPrismaIncluded extends CompanyPrisma {
  categories?: CategoryPrisma[];
  user?: UserPrisma;
}

export class PrismaCompanyMapper {
  static toPrisma(company: Company): CompanyPrisma {
    return {
      id: company.id.toValue(),
      name: company.name,
      phone: company.phone,
      description: company.description,
      userId: company.userId.toValue(),
      urlAccess: company.urlAccess,
    };
  }

  static toDomain(company: CompanyPrismaIncluded): Company {
    return new Company(
      {
        userId: new UniqueEntityID(company.userId),
        name: company.name,
        phone: company.phone,
        description: company.description,
        categories:
          company.categories?.length > 0
            ? company.categories.map((d) => PrismaCategoryMapper.toDomain(d))
            : undefined,

        user: company.user
          ? PrismaUserMapper.toDomain(company.user)
          : undefined,
        urlAccess: company.urlAccess,
      },
      company.id,
    );
  }
}
