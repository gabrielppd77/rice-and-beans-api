import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryById } from './category-by-id';

interface Request {
  categoryId: string;
}

type Response = void;

@Injectable()
export class CategoryDelete {
  constructor(
    private categoryRepository: CategoryRepository,
    private categoryById: CategoryById,
  ) {}

  async execute(req: Request): Promise<Response> {
    const { categoryId } = req;
    const { category } = await this.categoryById.execute({ categoryId });
    await this.categoryRepository.delete(category.id.toValue());
  }
}
