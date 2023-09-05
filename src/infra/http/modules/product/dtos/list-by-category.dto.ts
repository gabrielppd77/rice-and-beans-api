import { Product } from '@domain/entities/product';

export class ListByCategoryDTO {
  id: string;
  name: string;
  order: number;
  constructor(productDomain: Product) {
    this.id = productDomain.id.toValue();
    this.name = productDomain.name;
    this.order = productDomain.order;
  }
}
