import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { CategoryUpdateManyOrders } from './category-update-many-orders';
import { Category } from '@domain/entities/category';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('CategoryUpdateManyOrders', () => {
  it('should update all order number of categories', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const categoryUpdateManyOrders = new CategoryUpdateManyOrders(
      categoryRepository,
    );

    const category1 = new Category({
      companyId: new UniqueEntityID(),
      name: 'category1',
      order: 1,
    });
    const category2 = new Category({
      companyId: new UniqueEntityID(),
      name: 'category2',
      order: 2,
    });

    categoryRepository.create(category1);
    categoryRepository.create(category2);

    const categoriesToUpdateOrders = [
      { id: category1.id.toValue(), order: 2 },
      { id: category2.id.toValue(), order: 1 },
    ];

    await categoryUpdateManyOrders.execute({
      categories: categoriesToUpdateOrders,
    });

    const category1DB = categoryRepository.categories[0];
    const category2DB = categoryRepository.categories[1];

    expect(category1DB.order).toEqual(2);
    expect(category2DB.order).toEqual(1);
  });
});
