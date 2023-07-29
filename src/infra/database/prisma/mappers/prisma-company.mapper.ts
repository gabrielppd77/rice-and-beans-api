import { Company as CompanyPrisma } from '@prisma/client';
import { Company } from '@domain/entities/company';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export class PrismaCompanyMapper {
  static toPrisma(company: Company): CompanyPrisma {
    return {
      id: company.id.toValue(),
      name: company.name,
      phone: company.phone,
      description: company.description,
      userId: company.userId.toValue(),
    };
  }

  static toDomain(company: CompanyPrisma): Company {
    return new Company(
      {
        userId: new UniqueEntityID(company.userId),
        name: company.name,
        phone: company.phone,
        description: company.description,
      },
      company.id,
    );
  }
}
