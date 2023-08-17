import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@domain/repositories/product.repository';
import { Product } from '@domain/entities/product';

interface Request {
  companyId: string;
}

interface Response {
  products: Product[];
}

@Injectable()
export class ProductList {
  constructor(private productRepository: ProductRepository) {}

  async execute(req: Request): Promise<Response> {
    const { companyId } = req;
    const products = await this.productRepository.listAll(companyId);
    return {
      products,
    };
  }
}
