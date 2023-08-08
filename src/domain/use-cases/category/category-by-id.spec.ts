import { Category } from '@domain/entities/category';
import { CategoryById } from './category-by-id';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('CategoryById', () => {
  it('should be get an category by id', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryById = new CategoryById(categoryRepository);

    const categoryToCreate = new Category({
      name: 'Category 1',
      companyId: new UniqueEntityID(),
    });
    categoryRepository.create(categoryToCreate);

    const { category } = await categoryById.execute({
      categoryId: categoryToCreate.id.toValue(),
    });

    expect(category).toBeTruthy();
    expect(category.id.toValue()).toEqual(categoryToCreate.id.toValue());
  });
});
