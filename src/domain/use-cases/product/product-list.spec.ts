import { Product } from '@domain/entities/product';
import { ProductList } from './product-list';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('ProductList', () => {
  it('should be get an array of products', async () => {
    const productRepository = new InMemoryProductRepository();
    const productList = new ProductList(productRepository);

    const companyIdToList = new UniqueEntityID();

    const productToCreate1 = new Product({
      companyId: companyIdToList,
      categoryId: new UniqueEntityID(),
      name: 'product1',
      price: 25.23,
      description: 'description1',
      order: 1,
    });
    const productToCreate2 = new Product({
      companyId: new UniqueEntityID(),
      categoryId: new UniqueEntityID(),
      name: 'product2',
      price: 30,
      description: 'description2',
      order: 1,
    });
    productRepository.create(productToCreate1);
    productRepository.create(productToCreate2);

    const { products } = await productList.execute({
      companyId: companyIdToList.toValue(),
    });

    expect(productRepository.products.length).toEqual(2);
    expect(products).toBeTruthy();
    expect(products.length).toEqual(1);
    expect(products[0].id.toValue()).toEqual(productToCreate1.id.toValue());
    expect(products[0].companyId.toValue()).toEqual(companyIdToList.toValue());
  });
});
