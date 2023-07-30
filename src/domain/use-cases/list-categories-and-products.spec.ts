import { InMemoryCategoryRepository } from '@test/repositories/in-memory-category.repository';
import { ListCategoriesAndProducts } from './list-categories-and-products';
import { Category } from '@domain/entities/category';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Product } from '@domain/entities/product';

describe('ListCategoriesAndProducts', () => {
  it('should be list categories with products', async () => {
    const categoryRepository = new InMemoryCategoryRepository();
    const listCategoriesAndProducts = new ListCategoriesAndProducts(
      categoryRepository,
    );

    const companyId = '1234';

    const newCategory = new Category({
      companyId: new UniqueEntityID(companyId),
      name: 'Category 1',
      photoUrl: 'www.photo.com',
    });
    const newProduct = new Product({
      categoryId: newCategory.id,
      name: 'Product 1',
      price: 25.6,
      description: 'Description',
      photoUrl: 'www.photo.com',
    });

    categoryRepository.categories.push(newCategory);
    categoryRepository.products.push(newProduct);

    const { categories } = await listCategoriesAndProducts.execute({
      companyId,
    });

    const firstCategory = categories[0];
    const firstProductOfCategory = firstCategory.products[0];

    expect(firstCategory).toBeTruthy();
    expect(firstProductOfCategory).toBeTruthy();

    expect(firstCategory.companyId.toValue()).toEqual(companyId);
    expect(firstProductOfCategory.categoryId.toValue()).toEqual(
      firstCategory.id.toValue(),
    );
  });
});
