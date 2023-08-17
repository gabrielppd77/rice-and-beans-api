import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@domain/repositories/product.repository';
import { ProductById } from './product-by-id';

interface Request {
  productId: string;
}

type Response = void;

@Injectable()
export class ProductDelete {
  constructor(
    private productRepository: ProductRepository,
    private productById: ProductById,
  ) {}

  async execute(req: Request): Promise<Response> {
    const { productId } = req;
    const { product } = await this.productById.execute({ productId });
    await this.productRepository.delete(product.id.toValue());
  }
}
