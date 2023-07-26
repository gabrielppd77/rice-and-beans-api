import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '@domain/repositories/user.repository';
import { UserRepositoryPrisma } from './prisma/repositories/user.repository.prisma';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryRepositoryPrisma } from './prisma/repositories/category.repository.prisma';

import { ProductRepository } from '@domain/repositories/product.repository';
import { ProductRepositoryPrisma } from './prisma/repositories/product.repository.prisma';

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
    {
      provide: ProductRepository,
      useClass: ProductRepositoryPrisma,
    },
  ],
  exports: [UserRepository, CategoryRepository, ProductRepository],
})
export class DatabaseModule {}
