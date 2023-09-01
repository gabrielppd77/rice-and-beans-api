import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product.repository';

export class InMemoryProductRepository extends ProductRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(product: Product, productId: string): Promise<void> {
    this.products = this.products.map((d) => {
      if (d.id.toValue() === productId) {
        return product;
      }
    });
  }

  async delete(productId: string): Promise<void> {
    this.products = this.products.filter((d) => d.id.toValue() !== productId);
  }

  async getById(productId: string): Promise<Product | null> {
    const itemFinded = this.products.find((d) => d.id.toValue() === productId);
    if (!itemFinded) return null;
    return itemFinded;
  }

  async listAll(companyId): Promise<Product[]> {
    return this.products.filter((d) => d.companyId.toValue() === companyId);
  }

  async countInCompany(companyId: string): Promise<number> {
    return this.products.filter((d) => d.companyId.toValue() === companyId)
      .length;
  }
}
