import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product.repository';

interface Request {
  categoryId: string;
}

interface Response {
  products: Product[];
}

@Injectable()
export class ProductListByCategory {
  constructor(private productRepository: ProductRepository) {}
  async execute(req: Request): Promise<Response> {
    const { categoryId } = req;
    const products = await this.productRepository.listByCategory(categoryId);
    return { products };
  }
}
