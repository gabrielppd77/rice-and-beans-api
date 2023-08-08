import { Category } from '@domain/entities/category';
import { CategoryList } from './category-list';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('CategoryList', () => {
  it('should be get an array of categories', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryList = new CategoryList(categoryRepository);

    const categoryToCreate1 = new Category({
      name: 'Category 1',
      companyId: new UniqueEntityID(),
    });
    const categoryToCreate2 = new Category({
      name: 'Category 2',
      companyId: new UniqueEntityID(),
    });
    categoryRepository.create(categoryToCreate1);
    categoryRepository.create(categoryToCreate2);

    const { categories } = await categoryList.execute();

    expect(categories).toBeTruthy();
    expect(categories.length).toEqual(2);
    expect(categories[0].id.toValue()).toEqual(categoryToCreate1.id.toValue());
    expect(categories[1].id.toValue()).toEqual(categoryToCreate2.id.toValue());
  });
});
