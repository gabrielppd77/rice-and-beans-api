import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { CategoryUpdate } from './category-update';
import { Category } from '@domain/entities/category';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('CategoryUpdate', () => {
  it('should be update an category correctly', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryUpdate = new CategoryUpdate(categoryRepository);

    const categoryToCreate = new Category({
      name: 'cafés',
      companyId: new UniqueEntityID(),
      photoUrl: 'https://www.example.com/',
    });
    categoryRepository.create(categoryToCreate);

    const categoryToUpdate = new Category(
      {
        name: 'pizzas',
        companyId: categoryToCreate.companyId,
        photoUrl: 'https://www.example2.com/',
      },
      categoryToCreate.id.toValue(),
    );

    await categoryUpdate.execute({ category: categoryToUpdate });

    const categoryCurrent = categoryRepository.categories[0];

    expect(categoryCurrent).toBeTruthy();

    expect(categoryCurrent.id.toValue()).toEqual(categoryToCreate.id.toValue());
    expect(categoryCurrent.id.toValue()).toEqual(categoryToUpdate.id.toValue());

    expect(categoryCurrent.companyId.toValue()).toEqual(
      categoryToCreate.companyId.toValue(),
    );
    expect(categoryCurrent.companyId.toValue()).toEqual(
      categoryToUpdate.companyId.toValue(),
    );

    expect(categoryCurrent.photoUrl).not.toEqual(categoryToCreate.photoUrl);
    expect(categoryCurrent.photoUrl).toEqual(categoryToUpdate.photoUrl);

    expect(categoryCurrent.name).not.toEqual(categoryToCreate.name);
    expect(categoryCurrent.name).toEqual(categoryToUpdate.name);
  });
});
