import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { ProductRepository } from '@domain/repositories/product.repository';

import { Product } from '@domain/entities/product';

import { PrismaProductMapper } from '../mappers/prisma-product.mapper';

@Injectable()
export class ProductRepositoryPrisma implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async create(product: Product): Promise<void> {
    const productPrisma = PrismaProductMapper.toPrisma(product);
    await this.prismaService.product.create({
      data: productPrisma,
    });
  }

  async update(product: Product, productId: string): Promise<void> {
    const productPrisma = PrismaProductMapper.toPrisma(product);
    await this.prismaService.product.update({
      data: productPrisma,
      where: {
        id: productId,
      },
    });
  }

  async delete(productId: string): Promise<void> {
    await this.prismaService.product.delete({
      where: { id: productId },
    });
  }

  async getById(productId: string): Promise<Product | null> {
    const productPrisma = await this.prismaService.product.findFirst({
      where: { id: productId },
    });
    if (!productPrisma) return null;
    return PrismaProductMapper.toDomain(productPrisma);
  }

  async listAll(companyId: string): Promise<Product[]> {
    const productsPrisma = await this.prismaService.product.findMany({
      where: {
        companyId,
      },
    });
    return productsPrisma.map((d) => PrismaProductMapper.toDomain(d));
  }
}
