import { Category } from '@domain/entities/category';

export class CategoryViewModelDTO {
  id: string;
  name: string;
  photoUrl?: string;
  constructor(category: Category) {
    this.id = category.id.toValue();
    this.name = category.name;
    this.photoUrl = category.photoUrl;
  }
}
