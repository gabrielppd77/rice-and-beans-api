import { Company as CompanyPrisma } from '@prisma/client';
import { Company } from '@domain/entities/company';

export class PrismaCompanyMapper {
  static toPrisma(company: Company): CompanyPrisma {
    return {
      id: company.id.toValue(),
      name: company.name,
      phone: company.phone,
      description: company.description,
      userId: company.userId,
    };
  }

  static toDomain(company: CompanyPrisma): Company {
    return new Company(
      {
        userId: company.userId,
        name: company.name,
        phone: company.phone,
        description: company.description,
      },
      company.id,
    );
  }
}
