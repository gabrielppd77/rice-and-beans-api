import { Product } from '@domain/entities/product';

export class ProductGetByIdDTO {
  id: string;
  companyId: string;
  categoryId: string;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;
  order: number;
  constructor(productDomain: Product) {
    this.id = productDomain.id.toValue();
    this.companyId = productDomain.companyId.toValue();
    this.categoryId = productDomain.categoryId.toValue();
    this.name = productDomain.name;
    this.price = productDomain.price;
    this.photoUrl = productDomain.photoUrl;
    this.description = productDomain.description;
    this.order = productDomain.order;
  }
}
