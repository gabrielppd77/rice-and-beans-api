import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@domain/repositories/product.repository';

interface Request {
  products: { id: string; order: number }[];
}

type Response = void;

@Injectable()
export class ProductUpdateManyOrders {
  constructor(private productRepository: ProductRepository) {}
  async execute(req: Request): Promise<Response> {
    const { products } = req;
    await this.productRepository.updateManyOrders(products);
  }
}
