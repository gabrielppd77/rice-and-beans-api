import {
  Prisma,
  Product as ProductPrisma,
  Category as CategoryPrisma,
  Company as CompanyPrisma,
} from '@prisma/client';
import { Product } from '@domain/entities/product';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

import { PrismaCategoryMapper } from './prisma-category.mapper';
import { PrismaCompanyMapper } from './prisma-company.mapper';

interface ProductPrismaIncluded extends ProductPrisma {
  category?: CategoryPrisma;
  company?: CompanyPrisma;
}

export class PrismaProductMapper {
  static toPrisma(product: Product): ProductPrisma {
    return {
      id: product.id.toValue(),
      name: product.name,
      photoUrl: product.photoUrl,
      companyId: product.companyId.toValue(),
      categoryId: product.categoryId.toValue(),
      description: product.description,
      price: new Prisma.Decimal(product.price),
      order: product.order,
    };
  }

  static toDomain(product: ProductPrismaIncluded): Product {
    return new Product(
      {
        companyId: new UniqueEntityID(product.companyId),
        categoryId: new UniqueEntityID(product.categoryId),
        name: product.name,
        price: product.price.toNumber(),
        photoUrl: product.photoUrl,
        description: product.description,
        category: product.category
          ? PrismaCategoryMapper.toDomain(product.category)
          : undefined,
        company: product.company
          ? PrismaCompanyMapper.toDomain(product.company)
          : undefined,
        order: product.order,
      },
      product.id,
    );
  }
}
