import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { Category } from '@domain/entities/category';

interface Request {
  companyId: string;
}

interface Response {
  categories: Category[];
}

@Injectable()
export class CategoryList {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(req: Request): Promise<Response> {
    const { companyId } = req;
    const categories = await this.categoryRepository.listAll(companyId);
    return {
      categories,
    };
  }
}
