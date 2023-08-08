import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { Category } from '@domain/entities/category';

interface Request {
  categoryId: string;
}

interface Response {
  category: Category;
}

@Injectable()
export class CategoryById {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(req: Request): Promise<Response> {
    const { categoryId } = req;
    const category = await this.categoryRepository.getById(categoryId);
    return {
      category,
    };
  }
}
