import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { Category } from '@domain/entities/category';

interface Response {
  categories: Category[];
}

@Injectable()
export class CategoryList {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Response> {
    const categories = await this.categoryRepository.listAll();
    return {
      categories,
    };
  }
}
