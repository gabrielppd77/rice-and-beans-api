import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { CategoryRepository } from '@domain/repositories/category.repository';

import { Category } from '@domain/entities/category';

import { PrismaCategoryMapper } from '../mappers/prisma-category.mapper';

@Injectable()
export class CategoryRepositoryPrisma implements CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async create(category: Category): Promise<void> {
    const categoryPrisma = PrismaCategoryMapper.toPrisma(category);
    await this.prismaService.category.create({
      data: categoryPrisma,
    });
  }
}
