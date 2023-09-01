import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities/product';

@Injectable()
export abstract class ProductRepository {
  abstract create(user: Product): Promise<void>;
  abstract update(product: Product, productId: string): Promise<void>;
  abstract delete(productId: string): Promise<void>;
  abstract getById(productId: string): Promise<Product | null>;
  abstract listAll(productId: string): Promise<Product[]>;
  abstract countInCompany(companyId: string): Promise<number>;
}
