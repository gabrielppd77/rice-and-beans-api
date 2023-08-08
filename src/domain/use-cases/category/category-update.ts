import { Injectable } from '@nestjs/common';

import { Category } from '@domain/entities/category';
import { CategoryRepository } from '@domain/repositories/category.repository';

interface Request {
  category: Category;
}

type Response = void;

@Injectable()
export class CategoryUpdate {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(req: Request): Promise<Response> {
    const { category } = req;
    await this.categoryRepository.update(category);
  }
}
