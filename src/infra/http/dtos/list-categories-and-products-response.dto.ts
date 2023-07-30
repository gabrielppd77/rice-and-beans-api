import { Category } from '@domain/entities/category';
import { Product } from '@domain/entities/product';

class ProductResponseDTO {
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

class CategoryResponseDTO {
  id: string;
  name: string;
  photoUrl?: string;
  products: ProductResponseDTO[];
  constructor(categoryDomain: Category) {
    this.id = categoryDomain.id.toValue();
    this.name = categoryDomain.name;
    this.photoUrl = categoryDomain.photoUrl;
    this.products = categoryDomain.products.map(
      (productDomain) => new ProductResponseDTO(productDomain),
    );
  }
}

export class ListCategoriesAndProductsResponseDTO {
  categories: CategoryResponseDTO[];
  constructor(categoriesDomain: Category[]) {
    this.categories = categoriesDomain.map(
      (categoryDomain) => new CategoryResponseDTO(categoryDomain),
    );
  }
}
