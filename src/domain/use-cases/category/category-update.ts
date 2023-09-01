import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryById } from './category-by-id';

interface Request {
  name: string;
}

type Response = void;

@Injectable()
export class CategoryUpdate {
  constructor(
    private categoryRepository: CategoryRepository,
    private categoryById: CategoryById,
  ) {}

  async execute(req: Request, categoryId: string): Promise<Response> {
    const { name } = req;
    const { category } = await this.categoryById.execute({ categoryId });
    category.name = name;
    await this.categoryRepository.update(category, categoryId);
  }
}
