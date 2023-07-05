import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { UserRepository } from '@app/repositories/user.repository';
import { User } from '@app/entities/user';

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
  async create(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: user,
    });
  }
}
