import { Injectable } from '@nestjs/common';

import { Category } from '@domain/entities/category';

@Injectable()
export abstract class CategoryRepository {
  abstract create(user: Category): Promise<void>;
  abstract listAllWithProducts(companyId: string): Promise<Category[]>;
}
