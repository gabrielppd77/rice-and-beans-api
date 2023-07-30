import {
  Category as CategoryPrisma,
  Product as ProductPrisma,
  Company as CompanyPrisma,
} from '@prisma/client';
import { Category } from '@domain/entities/category';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

import { PrismaProductMapper } from './prisma-product.mapper';
import { PrismaCompanyMapper } from './prisma-company.mapper';

interface CategoryPrismaIncluded extends CategoryPrisma {
  products?: ProductPrisma[];
  company?: CompanyPrisma;
}

export class PrismaCategoryMapper {
  static toPrisma(category: Category): CategoryPrisma {
    return {
      id: category.id.toValue(),
      name: category.name,
      companyId: category.companyId.toValue(),
      photoUrl: category.photoUrl,
    };
  }

  static toDomain(category: CategoryPrismaIncluded): Category {
    return new Category(
      {
        name: category.name,
        companyId: new UniqueEntityID(category.companyId),
        photoUrl: category.photoUrl,
        products:
          category.products?.length > 0
            ? category.products.map((d) => PrismaProductMapper.toDomain(d))
            : undefined,
        company: category.company
          ? PrismaCompanyMapper.toDomain(category.company)
          : undefined,
      },
      category.id,
    );
  }
}
