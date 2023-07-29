import { Prisma, Product as ProductPrisma } from '@prisma/client';
import { Product } from '@domain/entities/product';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export class PrismaProductMapper {
  static toPrisma(product: Product): ProductPrisma {
    return {
      id: product.id.toValue(),
      name: product.name,
      photoUrl: product.photoUrl,
      categoryId: product.categoryId.toValue(),
      description: product.description,
      price: new Prisma.Decimal(product.price),
    };
  }

  static toDomain(product: ProductPrisma): Product {
    return new Product(
      {
        categoryId: new UniqueEntityID(product.categoryId),
        name: product.name,
        price: product.price.toNumber(),
        photoUrl: product.photoUrl,
        description: product.description,
      },
      product.id,
    );
  }
}
