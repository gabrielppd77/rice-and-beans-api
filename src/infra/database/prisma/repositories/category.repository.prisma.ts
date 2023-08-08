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

  async update(category: Category): Promise<void> {
    const categoryPrisma = PrismaCategoryMapper.toPrisma(category);
    await this.prismaService.category.update({
      data: categoryPrisma,
      where: {
        id: categoryPrisma.id,
      },
    });
  }

  async delete(categoryId: string): Promise<void> {
    await this.prismaService.category.delete({
      where: { id: categoryId },
    });
  }

  async getById(categoryId: string): Promise<Category> {
    const categoryPrisma = await this.prismaService.category.findFirst({
      where: { id: categoryId },
    });
    return PrismaCategoryMapper.toDomain(categoryPrisma);
  }

  async listAll(): Promise<Category[]> {
    const categoriesPrisma = await this.prismaService.category.findMany();
    return categoriesPrisma.map((d) => PrismaCategoryMapper.toDomain(d));
  }

  async listAllWithProducts(companyId: string): Promise<Category[]> {
    const categoriesPrisma = await this.prismaService.category.findMany({
      where: { companyId },
      include: { products: true },
    });
    const categoriesDomain = categoriesPrisma.map((d) =>
      PrismaCategoryMapper.toDomain(d),
    );
    return categoriesDomain;
  }
}
