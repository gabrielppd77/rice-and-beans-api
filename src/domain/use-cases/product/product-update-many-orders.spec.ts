import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { ProductUpdateManyOrders } from './product-update-many-orders';
import { Product } from '@domain/entities/product';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('ProductUpdateManyOrders', () => {
  it('should update all order number of products', async () => {
    const productRepository = new InMemoryProductRepository();
    const productUpdateManyOrders = new ProductUpdateManyOrders(
      productRepository,
    );

    const product1 = new Product({
      companyId: new UniqueEntityID(),
      categoryId: new UniqueEntityID(),
      name: 'product1',
      order: 1,
      price: 52,
    });
    const product2 = new Product({
      companyId: new UniqueEntityID(),
      categoryId: new UniqueEntityID(),
      name: 'product2',
      order: 2,
      price: 25,
    });

    productRepository.create(product1);
    productRepository.create(product2);

    const productsToUpdateOrders = [
      { id: product1.id.toValue(), order: 5 },
      { id: product2.id.toValue(), order: 6 },
    ];

    await productUpdateManyOrders.execute({
      products: productsToUpdateOrders,
    });

    const product1DB = productRepository.products[0];
    const product2DB = productRepository.products[1];

    expect(product1DB.order).toEqual(5);
    expect(product2DB.order).toEqual(6);
  });
});
