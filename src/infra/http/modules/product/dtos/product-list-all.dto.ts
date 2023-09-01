import { Product } from '@domain/entities/product';

export class ProductListAllDTO {
  id: string;
  name: string;
  price: number;
  order: number;
  constructor(productDomain: Product) {
    this.id = productDomain.id.toValue();
    this.name = productDomain.name;
    this.price = productDomain.price;
    this.order = productDomain.order;
  }
}
