import { Category } from '@domain/entities/category';
import { Product } from '@domain/entities/product';
import { CategoryRepository } from '@domain/repositories/category.repository';

export class InMemoryCategoryRepository extends CategoryRepository {
  public categories: Category[] = [];
  public products: Product[] = [];
  async create(category: Category): Promise<void> {
    this.categories.push(category);
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
