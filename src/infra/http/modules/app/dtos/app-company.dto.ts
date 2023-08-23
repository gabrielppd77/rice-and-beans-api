import { Category } from '@domain/entities/category';
import { Company } from '@domain/entities/company';
import { Product } from '@domain/entities/product';

class AppCompanyProductDTO {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  photoUrl?: string;
  description?: string;
  constructor(product: Product) {
    this.id = product.id.toValue();
    this.categoryId = product.categoryId.toValue();
    this.name = product.name;
    this.price = product.price;
    this.photoUrl = product.photoUrl;
    this.description = product.description;
  }
}

class AppCompanyCategoryDTO {
  id: string;
  companyId: string;
  name: string;
  products: AppCompanyProductDTO[];
  constructor(category: Category) {
    this.id = category.id.toValue();
    this.companyId = category.companyId.toValue();
    this.name = category.name;
    this.products = category.products
      ? category.products.map((d) => new AppCompanyProductDTO(d))
      : [];
  }
}

export class AppCompanyDTO {
  id: string;
  name: string;
  categories: AppCompanyCategoryDTO[];
  constructor(company: Company) {
    this.id = company.id.toValue();
    this.name = company.name;
    this.categories = company.categories
      ? company.categories.map((d) => new AppCompanyCategoryDTO(d))
      : [];
  }
}
