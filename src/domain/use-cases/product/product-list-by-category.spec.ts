import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { ProductListByCategory } from './product-list-by-category';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { Product } from '@domain/entities/product';

describe('ProductListByCategory', () => {
  it('should list all products by category', async () => {
    const productRepository = new InMemoryProductRepository();
    const productListByCategory = new ProductListByCategory(productRepository);

    const categoryId = new UniqueEntityID();

    productRepository.create(
      new Product({
        categoryId,
        companyId: new UniqueEntityID(),
        name: 'product1',
        order: 1,
        price: 42,
      }),
    );

    productRepository.create(
      new Product({
        categoryId,
        companyId: new UniqueEntityID(),
        name: 'product2',
        order: 2,
        price: 52,
      }),
    );

    productRepository.create(
      new Product({
        categoryId: new UniqueEntityID(),
        companyId: new UniqueEntityID(),
        name: 'product3',
        order: 1,
        price: 62,
      }),
    );

    const response = await productListByCategory.execute({
      categoryId: categoryId.toValue(),
    });

    const { products } = response;

    expect(response).toBeTruthy();
    expect(products.length).toEqual(2);
  });
});
