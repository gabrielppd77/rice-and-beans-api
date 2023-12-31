import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product.repository';

interface Request {
  companyId: string;
  categoryId: string;
  name: string;
  price: number;
  description?: string;
}

type Response = void;

@Injectable()
export class ProductCreate {
  constructor(private productRepository: ProductRepository) {}

  async execute(req: Request): Promise<Response> {
    const { companyId, categoryId, name, price, description } = req;
    const count = await this.productRepository.countInCategory(categoryId);
    const product = new Product({
      companyId: new UniqueEntityID(companyId),
      categoryId: new UniqueEntityID(categoryId),
      name,
      price,
      description,
      order: count + 1,
    });
    await this.productRepository.create(product);
  }
}
