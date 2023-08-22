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

  async update(category: Category, categoryId: string): Promise<void> {
    const categoryPrisma = PrismaCategoryMapper.toPrisma(category);
    await this.prismaService.category.update({
      data: categoryPrisma,
      where: {
        id: categoryId,
      },
    });
  }

  async delete(categoryId: string): Promise<void> {
    await this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }

  async getById(categoryId: string): Promise<Category | null> {
    const categoryPrisma = await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryPrisma) return null;
    return PrismaCategoryMapper.toDomain(categoryPrisma);
  }

  async listAll(companyId: string): Promise<Category[]> {
    const categoriesPrisma = await this.prismaService.category.findMany({
      where: {
        companyId,
      },
    });
    return categoriesPrisma.map((d) => PrismaCategoryMapper.toDomain(d));
  }
}
