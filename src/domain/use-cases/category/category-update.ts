import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '@domain/repositories/category.repository';
import { CategoryById } from './category-by-id';

interface Request {
  categoryId: string;
  name: string;
  photoUrl?: string;
}

type Response = void;

@Injectable()
export class CategoryUpdate {
  constructor(
    private categoryRepository: CategoryRepository,
    private categoryById: CategoryById,
  ) {}

  async execute(req: Request): Promise<Response> {
    const { categoryId, name, photoUrl } = req;
    const { category } = await this.categoryById.execute({ categoryId });
    category.name = name;
    category.photoUrl = photoUrl;
    await this.categoryRepository.update(category, categoryId);
  }
}
