import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product.repository';

export class InMemoryProductRepository extends ProductRepository {
  public products: Product[] = [];
  async create(product: Product): Promise<void> {
    this.products.push(product);
  }
}
