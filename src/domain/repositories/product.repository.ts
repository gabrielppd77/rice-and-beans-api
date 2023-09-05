import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities/product';

@Injectable()
export abstract class ProductRepository {
  abstract create(user: Product): Promise<void>;
  abstract update(product: Product, productId: string): Promise<void>;
  abstract delete(productId: string): Promise<void>;
  abstract getById(productId: string): Promise<Product | null>;
  abstract listAll(companyId: string): Promise<Product[]>;
  abstract countInCategory(categoryId: string): Promise<number>;
  abstract updateManyOrders(
    categories: { id: string; order: number }[],
  ): Promise<void>;
  abstract listByCategory(categoryId: string): Promise<Product[]>;
}
