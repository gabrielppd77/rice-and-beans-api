import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@domain/repositories/product.repository';
import { Product } from '@domain/entities/product';

import { RegisterNotFoundException } from '@domain/exceptions/register-not-found.exception';

interface Request {
  productId: string;
}

interface Response {
  product: Product;
}

@Injectable()
export class ProductById {
  constructor(private productRepository: ProductRepository) {}

  async execute(req: Request): Promise<Response> {
    const { productId } = req;
    const product = await this.productRepository.getById(productId);
    if (!product) throw new RegisterNotFoundException();
    return {
      product,
    };
  }
}
