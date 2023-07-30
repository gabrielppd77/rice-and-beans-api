import { Injectable } from '@nestjs/common';

import { Category } from '@domain/entities/category';
import { CategoryRepository } from '@domain/repositories/category.repository';

interface Request {
  companyId: string;
}

interface Response {
  categories: Category[];
}

@Injectable()
export class ListCategoriesAndProducts {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(req: Request): Promise<Response> {
    const { companyId } = req;
    const categories = await this.categoryRepository.listAllWithProducts(
      companyId,
    );
    return { categories };
  }
}
