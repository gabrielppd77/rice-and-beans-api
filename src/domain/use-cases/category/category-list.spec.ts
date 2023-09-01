import { Category } from '@domain/entities/category';
import { CategoryList } from './category-list';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('CategoryList', () => {
  it('should be get an array of categories', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryList = new CategoryList(categoryRepository);

    const companyIdToList = new UniqueEntityID();

    const categoryToCreate1 = new Category({
      name: 'Category 1',
      companyId: companyIdToList,
      order: 1,
    });
    const categoryToCreate2 = new Category({
      name: 'Category 2',
      companyId: new UniqueEntityID(),
      order: 1,
    });
    categoryRepository.create(categoryToCreate1);
    categoryRepository.create(categoryToCreate2);

    const { categories } = await categoryList.execute({
      companyId: companyIdToList.toValue(),
    });

    expect(categoryRepository.categories.length).toEqual(2);
    expect(categories).toBeTruthy();
    expect(categories.length).toEqual(1);
    expect(categories[0].id.toValue()).toEqual(categoryToCreate1.id.toValue());
    expect(categories[0].companyId.toValue()).toEqual(
      companyIdToList.toValue(),
    );
  });
});
