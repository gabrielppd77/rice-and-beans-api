import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';

interface Request {
  categories: { id: string; order: number }[];
}

type Response = void;

@Injectable()
export class CategoryUpdateManyOrders {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(req: Request): Promise<Response> {
    const { categories } = req;
    await this.categoryRepository.updateManyOrders(categories);
  }
}
