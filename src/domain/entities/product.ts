import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export interface ProductProps {
  categoryId: UniqueEntityID;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;
}

export class Product extends Entity<ProductProps> {
  public get categoryId() {
    return this.props.categoryId;
  }
  public get name() {
    return this.props.name;
  }
  public get price() {
    return this.props.price;
  }
  public get photoUrl() {
    return this.props.photoUrl;
  }
  public get description() {
    return this.props.description;
  }
}
