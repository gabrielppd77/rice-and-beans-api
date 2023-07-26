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
}
