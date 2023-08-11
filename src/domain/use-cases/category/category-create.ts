import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

import { Category } from '@domain/entities/category';
import { CategoryRepository } from '@domain/repositories/category.repository';

interface Request {
  companyId: string;
  name: string;
  photoUrl?: string;
}

type Response = void;

@Injectable()
export class CategoryCreate {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(req: Request): Promise<Response> {
    const { companyId, name, photoUrl } = req;
    const category = new Category({
      companyId: new UniqueEntityID(companyId),
      name,
      photoUrl,
    });
    await this.categoryRepository.create(category);
  }
}