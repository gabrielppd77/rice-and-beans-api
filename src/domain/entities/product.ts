import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Category } from './category';

export interface ProductProps {
  companyId: UniqueEntityID;
  categoryId: UniqueEntityID;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;

  category?: Category;
}

export class Product extends Entity<ProductProps> {
  get companyId() {
    return this.props.companyId;
  }
  get categoryId() {
    return this.props.categoryId;
  }
  get name() {
    return this.props.name;
  }
  get price() {
    return this.props.price;
  }
  get photoUrl() {
    return this.props.photoUrl;
  }
  get description() {
    return this.props.description;
  }
  get category() {
    return this.props.category;
  }
}
