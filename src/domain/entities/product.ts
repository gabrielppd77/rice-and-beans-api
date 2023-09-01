import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Category } from './category';
import { Company } from './company';

export interface ProductProps {
  companyId: UniqueEntityID;
  categoryId: UniqueEntityID;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;
  order: number;

  category?: Category;
  company?: Company;
}

export class Product extends Entity<ProductProps> {
  get companyId() {
    return this.props.companyId;
  }

  get categoryId() {
    return this.props.categoryId;
  }
  set categoryId(categoryId: UniqueEntityID) {
    this.props.categoryId = categoryId;
  }

  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }

  get price() {
    return this.props.price;
  }
  set price(price: number) {
    this.props.price = price;
  }

  get photoUrl() {
    return this.props.photoUrl;
  }
  set photoUrl(photoUrl: string) {
    this.props.photoUrl = photoUrl;
  }

  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }

  get order() {
    return this.props.order;
  }

  get category() {
    return this.props.category;
  }

  get company() {
    return this.props.company;
  }
}
