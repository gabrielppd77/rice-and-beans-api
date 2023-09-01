import { Category } from '@domain/entities/category';

export class CategoryGetByIdDTO {
  id: string;
  name: string;
  photoUrl?: string;
  order: number;
  constructor(category: Category) {
    this.id = category.id.toValue();
    this.name = category.name;
    this.photoUrl = category.photoUrl;
    this.order = category.order;
  }
}
