import { Category } from '@domain/entities/category';
import { CategoryDelete } from './category-delete';
import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { CategoryById } from './category-by-id';

describe('CategoryDelete', () => {
  it('should be delete an category', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryById = new CategoryById(categoryRepository);
    const categoryDelete = new CategoryDelete(categoryRepository, categoryById);

    const categoryToCreate = new Category({
      name: 'Category 1',
      companyId: new UniqueEntityID(),
    });
    categoryRepository.create(categoryToCreate);

    await categoryDelete.execute({ categoryId: categoryToCreate.id.toValue() });

    expect(categoryRepository.categories.length).toEqual(0);
  });
});
