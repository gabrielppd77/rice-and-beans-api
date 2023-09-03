import { Category } from '@domain/entities/category';
import { CategoryRepository } from '@domain/repositories/category.repository';

export class InMemoryCategoryRepository extends CategoryRepository {
  public categories: Category[] = [];

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

  async countInCompany(companyId: string): Promise<number> {
    return this.categories.filter((d) => d.companyId.toValue() === companyId)
      .length;
  }

  async updateManyOrders(
    categories: { id: string; order: number }[],
  ): Promise<void> {
    categories.forEach((newCategory) => {
      const categoryFinded = this.categories.find(
        (cat) => cat.id.toValue() === newCategory.id,
      );
      categoryFinded.order = newCategory.order;
    });
  }
}
