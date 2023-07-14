import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { UserRepository } from '@domain/repositories/user.repository';

import { User } from '@domain/entities/user';
import { Company } from '@domain/entities/company';

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
    return userFinded;
  }

  async create(user: User, company: Company): Promise<void> {
    await this.prismaService.user.create({
      data: {
        // id: user.id.toValue(),
        // email: user.email,
        // name: user.name,
        // password: user.password,
        // phone: user.phone,
        // company: {
        //   create: {
        //     id: company.id.toValue(),
        //     name: company.name,
        //     description: company.description,
        //     phone: company.phone,
        //   },
        },
      },
    });
  }
}
