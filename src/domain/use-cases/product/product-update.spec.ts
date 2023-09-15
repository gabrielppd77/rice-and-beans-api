import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { ProductUpdate } from './product-update';
import { ProductById } from './product-by-id';
import { Product } from '@domain/entities/product';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('ProductUpdate', () => {
  it('should be update a product correctly', async () => {
    const productRepository = new InMemoryProductRepository();
    const productById = new ProductById(productRepository);
    const productUpdate = new ProductUpdate(productRepository, productById);

    const productToCreate = new Product({
      companyId: new UniqueEntityID(),
      categoryId: new UniqueEntityID(),
      name: 'product1',
      price: 25.23,
      description: 'description',
      order: 1,
    });
    productRepository.create(productToCreate);

    const productNewFields = {
      categoryId: 'id-new-category',
      name: 'product2',
      price: 30,
      description: 'new-description',
    };

    await productUpdate.execute(productNewFields, productToCreate.id.toValue());

    const productCurrent = productRepository.products[0];

    expect(productCurrent).toBeTruthy();
    expect(productCurrent.id.toValue()).toEqual(productToCreate.id.toValue());
    expect(productCurrent.categoryId.toValue()).toEqual(
      productNewFields.categoryId,
    );
    expect(productCurrent.name).toEqual(productNewFields.name);
    expect(productCurrent.price).toEqual(productNewFields.price);
    expect(productCurrent.description).toEqual(productNewFields.description);
  });
});
