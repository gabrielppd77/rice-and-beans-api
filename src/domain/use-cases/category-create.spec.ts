import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { CategoryCreate } from './category-create';
import { CategoryProps } from '@domain/entities/category';

describe('CategoryCreate', () => {
  it('should be create an category correctly', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryCreate = new CategoryCreate(categoryRepository);

    const categoryToCreate: CategoryProps = {
      name: 'cafés',
      companyId: '1',
      photoUrl: 'https://www.example.com/',
    };

    await categoryCreate.execute(categoryToCreate);

    const categoryCreated = categoryRepository.categories[0];

    expect(categoryCreated).toBeTruthy();
    expect(categoryCreated.id).toBeDefined();
    expect(categoryCreated.name).toEqual(categoryToCreate.name);
    expect(categoryCreated.companyId).toEqual(categoryToCreate.companyId);
    expect(categoryCreated.photoUrl).toEqual(categoryToCreate.photoUrl);
  });
});
