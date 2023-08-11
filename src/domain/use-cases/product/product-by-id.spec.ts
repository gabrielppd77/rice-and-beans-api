import { Product } from '@domain/entities/product';
import { ProductById } from './product-by-id';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

import { RegisterNotFoundException } from '@domain/exceptions/register-not-found.exception';

describe('ProductById', () => {
  it('should be get an product by id', async () => {
    const productRepository = new InMemoryProductRepository();
    const productById = new ProductById(productRepository);

    const productToCreate = new Product({
      name: 'Product 1',
      companyId: new UniqueEntityID(),
      categoryId: new UniqueEntityID(),
      price: 22.5,
    });
    productRepository.create(productToCreate);

    const { product } = await productById.execute({
      productId: productToCreate.id.toValue(),
    });

    expect(product).toBeTruthy();
    expect(product.id.toValue()).toEqual(productToCreate.id.toValue());
  });

  it('should be show error when not found a register', async () => {
    const productRepository = new InMemoryProductRepository();
    const productById = new ProductById(productRepository);

    await expect(
      async () =>
        await productById.execute({
          productId: '1',
        }),
    ).rejects.toThrow(RegisterNotFoundException);
  });
});
