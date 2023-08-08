import { Injectable } from '@nestjs/common';

import { Category } from '@domain/entities/category';

@Injectable()
export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>;
  abstract update(category: Category): Promise<void>;
  abstract delete(categoryId: string): Promise<void>;
  abstract getById(categoryId: string): Promise<Category>;
  abstract listAll(): Promise<Category[]>;
  abstract listAllWithProducts(companyId: string): Promise<Category[]>;
}
