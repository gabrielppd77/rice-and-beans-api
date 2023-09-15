import { Product } from '@domain/entities/product';

export class ProductListAllDTO {
  id: string;
  name: string;
  price: number;
  order: number;
  imageUrl: string;
  constructor(productDomain: Product) {
    this.id = productDomain.id.toValue();
    this.name = productDomain.name;
    this.price = productDomain.price;
    this.order = productDomain.order;
    this.imageUrl = productDomain.imageUrl;
  }
}
