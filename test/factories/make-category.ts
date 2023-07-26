import { Category, CategoryProps } from '@domain/entities/category';

export function makeCategory(override?: Partial<CategoryProps>) {
  const category = new Category({
    name: 'Cafés',
    photoUrl: 'http://www.cafes.com',
    categoryParentId: '123456789',
    ...override,
  });

  return category;
}
