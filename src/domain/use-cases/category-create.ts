import { Category } from '@domain/entities/category';
import { CategoryRepository } from '@domain/repositories/category.repository';
import { Injectable } from '@nestjs/common';

interface Request {
  name: string;
  photoUrl?: string;
  categoryParentId?: string;
}

type Response = void;

@Injectable()
export class CategoryCreate {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(req: Request): Promise<Response> {
    const { name, photoUrl, categoryParentId } = req;
    const category = new Category({ name, photoUrl, categoryParentId });
    await this.categoryRepository.create(category);
  }
}
