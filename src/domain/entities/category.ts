import { Entity } from '@core/entities/entity';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Product } from './product';
import { Company } from './company';

export interface CategoryProps {
  companyId: UniqueEntityID;
  name: string;
  order: number;

  company?: Company;
  products?: Product[];
}

export class Category extends Entity<CategoryProps> {
  get companyId() {
    return this.props.companyId;
  }
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get order() {
    return this.props.order;
  }
  get company() {
    return this.props.company;
  }
  get products() {
    return this.props.products;
  }
  set products(products: Product[]) {
    this.props.products = products;
  }
}
