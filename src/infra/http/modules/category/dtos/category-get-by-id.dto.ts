import { Category } from '@domain/entities/category';

export class CategoryGetByIdDTO {
  id: string;
  name: string;
  order: number;
  constructor(category: Category) {
    this.id = category.id.toValue();
    this.name = category.name;
    this.order = category.order;
  }
}
