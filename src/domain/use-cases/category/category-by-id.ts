import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { Category } from '@domain/entities/category';

import { RegisterNotFoundException } from '@domain/exceptions/register-not-found.exception';

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
    if (!category) throw new RegisterNotFoundException();
    return {
      category,
    };
  }
}
