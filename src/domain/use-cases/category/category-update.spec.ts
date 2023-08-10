import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { CategoryUpdate } from './category-update';
import { CategoryById } from './category-by-id';
import { Category } from '@domain/entities/category';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('CategoryUpdate', () => {
  it('should be update an category correctly', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryById = new CategoryById(categoryRepository);
    const categoryUpdate = new CategoryUpdate(categoryRepository, categoryById);

    const categoryToCreate = new Category({
      name: 'cafés',
      companyId: new UniqueEntityID(),
      photoUrl: 'https://www.example.com/',
    });
    categoryRepository.create(categoryToCreate);

    const categoryNewFields = {
      name: 'pizzas',
      photoUrl: 'https://www.xd.com/',
    };

    await categoryUpdate.execute({
      ...categoryNewFields,
      categoryId: categoryToCreate.id.toValue(),
    });

    const categoryCurrent = categoryRepository.categories[0];

    expect(categoryCurrent).toBeTruthy();
    expect(categoryCurrent.id.toValue()).toEqual(categoryToCreate.id.toValue());
    expect(categoryCurrent.name).toEqual(categoryNewFields.name);
    expect(categoryCurrent.photoUrl).toEqual(categoryNewFields.photoUrl);
  });
});
