import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { UserRepository } from '@domain/repositories/user.repository';

import { User } from '@domain/entities/user';
import { Company } from '@domain/entities/company';

import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { PrismaCompanyMapper } from '../mappers/prisma-company.mapper';

@Injectable()
export class UserRepositoryPrisma implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const userFinded = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!userFinded) return null;
    return PrismaUserMapper.toDomain(userFinded);
  }

  async create(user: User, company: Company): Promise<void> {
    const userPrisma = PrismaUserMapper.toPrisma(user);
    const companyPrisma = PrismaCompanyMapper.toPrisma(company);

    delete companyPrisma.userId;

    await this.prismaService.user.create({
      data: {
        ...userPrisma,
        company: {
          create: companyPrisma,
        },
      },
    });
  }
}
