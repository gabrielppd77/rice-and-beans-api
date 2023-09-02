import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { ConsumerRepository } from '@domain/repositories/consumer.repository';

import { Company } from '@domain/entities/company';
import { PrismaCompanyMapper } from '../mappers/prisma-company.mapper';

@Injectable()
export class ConsumerRepositoryPrisma implements ConsumerRepository {
  constructor(private prismaService: PrismaService) {}
  async getCompanyByUrlAccess(urlAccess: string): Promise<Company> {
    const company = await this.prismaService.company.findFirst({
      where: {
        urlAccess,
      },
      include: {
        categories: {
          include: {
            products: true,
          },
        },
      },
    });
    if (!company) return null;
    return PrismaCompanyMapper.toDomain(company);
  }
}
