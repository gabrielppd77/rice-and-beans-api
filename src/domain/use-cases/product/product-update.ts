import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@domain/repositories/product.repository';
import { ProductById } from './product-by-id';

import { UniqueEntityID } from '@core/entities/unique-entity-id';

interface Request {
  categoryId: string;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;
}

type Response = void;

@Injectable()
export class ProductUpdate {
  constructor(
    private productRepository: ProductRepository,
    private productById: ProductById,
  ) {}

  async execute(req: Request, productId: string): Promise<Response> {
    const { categoryId, name, price, photoUrl, description } = req;
    const { product } = await this.productById.execute({ productId });
    product.categoryId = new UniqueEntityID(categoryId);
    product.name = name;
    product.price = price;
    product.photoUrl = photoUrl;
    product.description = description;
    await this.productRepository.update(product, productId);
  }
}
