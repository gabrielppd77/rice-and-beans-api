import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { UserRepository } from '@domain/repositories/user.repository';
import { UserRepositoryPrisma } from './prisma/repositories/user.repository.prisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserRepositoryPrisma,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
