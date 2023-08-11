import { Product } from '@domain/entities/product';

export class ProductViewModelDTO {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;
  constructor(productDomain: Product) {
    this.id = productDomain.id.toValue();
    this.categoryId = productDomain.categoryId.toValue();
    this.name = productDomain.name;
    this.price = productDomain.price;
    this.photoUrl = productDomain.photoUrl;
    this.description = productDomain.description;
  }
}
