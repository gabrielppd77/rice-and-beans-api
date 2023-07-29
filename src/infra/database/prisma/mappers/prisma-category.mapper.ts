import { Category as CategoryPrisma } from '@prisma/client';
import { Category } from '@domain/entities/category';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

export class PrismaCategoryMapper {
  static toPrisma(category: Category): CategoryPrisma {
    return {
      id: category.id.toValue(),
      name: category.name,
      companyId: category.companyId.toValue(),
      photoUrl: category.photoUrl,
    };
  }

  static toDomain(category: CategoryPrisma): Category {
    return new Category(
      {
        name: category.name,
        companyId: new UniqueEntityID(category.companyId),
        photoUrl: category.photoUrl,
      },
      category.id,
    );
  }
}
