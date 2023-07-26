import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '@domain/repositories/user.repository';
import { UserRepositoryPrisma } from './prisma/repositories/user.repository.prisma';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryRepositoryPrisma } from './prisma/repositories/category.repository.prisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryPrisma,
    },
  ],
  exports: [UserRepository, CategoryRepository],
})
export class DatabaseModule {}
