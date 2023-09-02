import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { ConsumerRepository } from '@domain/repositories/consumer.repository';
import { ConsumerRepositoryPrisma } from './prisma/repositories/consumer.repository.prisma';

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
      provide: ConsumerRepository,
      useClass: ConsumerRepositoryPrisma,
    },
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
  exports: [
    ConsumerRepository,
    UserRepository,
    CategoryRepository,
    ProductRepository,
  ],
})
export class DatabaseModule {}
