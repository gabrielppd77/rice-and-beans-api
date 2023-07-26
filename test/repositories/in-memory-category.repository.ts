import { Category } from '@domain/entities/category';
import { CategoryRepository } from '@domain/repositories/category.repository';

export class InMemoryCategoryRepository extends CategoryRepository {
  public categories: Category[] = [];
  async create(category: Category): Promise<void> {
    this.categories.push(category);
  }
}
