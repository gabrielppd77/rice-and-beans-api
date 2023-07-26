import { Entity } from '@core/entities/entity';

export interface ProductProps {
  categoryId: string;
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
