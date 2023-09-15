import { Category } from '@domain/entities/category';
import { Company } from '@domain/entities/company';
import { Product } from '@domain/entities/product';

class ConsumerCompanyProductDTO {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  constructor(product: Product) {
    this.id = product.id.toValue();
    this.categoryId = product.categoryId.toValue();
    this.name = product.name;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
    this.description = product.description;
  }
}

class ConsumerCompanyCategoryDTO {
  id: string;
  companyId: string;
  name: string;
  products: ConsumerCompanyProductDTO[];
  constructor(category: Category) {
    this.id = category.id.toValue();
    this.companyId = category.companyId.toValue();
    this.name = category.name;
    this.products = category.products
      ? category.products.map((d) => new ConsumerCompanyProductDTO(d))
      : [];
  }
}

export class ConsumerCompanyDTO {
  id: string;
  name: string;
  categories: ConsumerCompanyCategoryDTO[];
  constructor(company: Company) {
    this.id = company.id.toValue();
    this.name = company.name;
    this.categories = company.categories
      ? company.categories.map((d) => new ConsumerCompanyCategoryDTO(d))
      : [];
  }
}
