import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';

interface Request {
  categoryId: string;
}

type Response = void;

@Injectable()
export class CategoryDelete {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(req: Request): Promise<Response> {
    const { categoryId } = req;
    await this.categoryRepository.delete(categoryId);
  }
}
