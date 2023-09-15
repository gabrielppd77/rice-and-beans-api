import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { ProductCreate } from './product-create';

describe('ProductCreate', () => {
  it('should be create an product correctly', async () => {
    const productRepository = new InMemoryProductRepository();
    const productCreate = new ProductCreate(productRepository);

    const productToCreate = {
      companyId: '1234567',
      categoryId: '123456789',
      description: 'description product',
      name: 'Pizza Calabresa',
      price: 60.5,
    };

    await productCreate.execute(productToCreate);

    const productCreated = productRepository.products[0];

    expect(productCreated).toBeTruthy();
    expect(productCreated.id).toBeDefined();
    expect(productCreated.companyId.toValue()).toEqual(
      productToCreate.companyId,
    );
    expect(productCreated.categoryId.toValue()).toEqual(
      productToCreate.categoryId,
    );
    expect(productCreated.description).toEqual(productToCreate.description);
    expect(productCreated.name).toEqual(productToCreate.name);
    expect(productCreated.price).toEqual(productToCreate.price);
    expect(productCreated.order).toEqual(1);
  });
});
