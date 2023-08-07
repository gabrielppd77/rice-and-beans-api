import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product.repository';

interface Request {
  categoryId: string;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;
}

type Response = void;

@Injectable()
export class ProductCreate {
  constructor(private productRepository: ProductRepository) {}

  async execute(req: Request): Promise<Response> {
    const { categoryId, name, price, photoUrl, description } = req;
    const product = new Product({
      categoryId: new UniqueEntityID(categoryId),
      name,
      price,
      photoUrl,
      description,
    });
    await this.productRepository.create(product);
  }
}
