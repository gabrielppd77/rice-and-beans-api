import { Product } from '@domain/entities/product';

export class ProductGetByIdDTO {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  order: number;
  constructor(productDomain: Product) {
    this.id = productDomain.id.toValue();
    this.categoryId = productDomain.categoryId.toValue();
    this.name = productDomain.name;
    this.price = productDomain.price;
    this.imageUrl = productDomain.imageUrl;
    this.description = productDomain.description;
    this.order = productDomain.order;
  }
}
