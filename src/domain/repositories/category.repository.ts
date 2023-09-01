import { Injectable } from '@nestjs/common';

import { Category } from '@domain/entities/category';

@Injectable()
export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>;
  abstract update(category: Category, categoryId: string): Promise<void>;
  abstract delete(categoryId: string): Promise<void>;
  abstract getById(categoryId: string): Promise<Category | null>;
  abstract listAll(companyId: string): Promise<Category[]>;
  abstract countInCompany(companyId: string): Promise<number>;
}
