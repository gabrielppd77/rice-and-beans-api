import { Category as CategoryPrisma } from '@prisma/client';
import { Category } from '@domain/entities/category';

export class PrismaCategoryMapper {
  static toPrisma(category: Category): CategoryPrisma {
    return {
      id: category.id.toValue(),
      name: category.name,
      categoryParentId: category.categoryParentId,
      photoUrl: category.photoUrl,
    };
  }

  static toDomain(category: CategoryPrisma): Category {
    return new Category(
      {
        name: category.name,
        categoryParentId: category.categoryParentId,
        photoUrl: category.photoUrl,
      },
      category.id,
    );
  }
}
