import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { ProductCreate } from './product-create';

describe('ProductCreate', () => {
  it('should be create an product correctly', async () => {
    const productRepository = new InMemoryProductRepository();
    const productCreate = new ProductCreate(productRepository);

    const productToCreate = {
      categoryId: '123456789',
      description: 'description product',
      name: 'Pizza Calabresa',
      photoUrl: 'http://www.cafes.com',
      price: 60.5,
    };

    await productCreate.execute(productToCreate);

    const productCreated = productRepository.products[0];

    expect(productCreated).toBeTruthy();
    expect(productCreated.id).toBeDefined();
    expect(productCreated.categoryId.toValue()).toEqual(
      productToCreate.categoryId,
    );
    expect(productCreated.description).toEqual(productToCreate.description);
    expect(productCreated.name).toEqual(productToCreate.name);
    expect(productCreated.photoUrl).toEqual(productToCreate.photoUrl);
    expect(productCreated.price).toEqual(productToCreate.price);
  });
});
