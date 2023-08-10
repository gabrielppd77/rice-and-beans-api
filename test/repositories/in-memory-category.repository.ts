import { Category } from '@domain/entities/category';
import { Product } from '@domain/entities/product';
import { CategoryRepository } from '@domain/repositories/category.repository';

export class InMemoryCategoryRepository extends CategoryRepository {
  public categories: Category[] = [];
  public products: Product[] = [];

  async create(category: Category): Promise<void> {
    this.categories.push(category);
  }

  async update(category: Category, categoryId: string): Promise<void> {
    this.categories = this.categories.map((d) => {
      if (d.id.toValue() === categoryId) {
        return category;
      }
    });
  }

  async delete(categoryId: string): Promise<void> {
    this.categories = this.categories.filter(
      (d) => d.id.toValue() !== categoryId,
    );
  }

  async getById(categoryId: string): Promise<Category | null> {
    const itemFinded = this.categories.find(
      (d) => d.id.toValue() === categoryId,
    );
    if (!itemFinded) return null;
    return itemFinded;
  }

  async listAll(companyId): Promise<Category[]> {
    return this.categories.filter((d) => d.companyId.toValue() === companyId);
  }

  async listAllWithProducts(companyId: string): Promise<Category[]> {
    const categories = this.categories.filter(
      (d) => d.companyId.toValue() === companyId,
    );
    return categories.map((category) => {
      const productsOfCategory = this.products.filter(
        (product) => product.categoryId.toValue() === category.id.toValue(),
      );
      if (productsOfCategory.length > 0) {
        category.products = productsOfCategory;
        return category;
      }
      return category;
    });
  }
}
