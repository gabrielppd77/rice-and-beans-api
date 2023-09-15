import { Product } from '@domain/entities/product';
import { ProductDelete } from './product-delete';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { UniqueEntityID } from '@core/entities/unique-entity-id';
import { ProductById } from './product-by-id';
import { FileService } from '@core/use-cases/file-service';

describe('ProductDelete', () => {
  it('should be delete a product', async () => {
    const fileService = new FileService();
    const productRepository = new InMemoryProductRepository();
    const productById = new ProductById(productRepository);
    const productDelete = new ProductDelete(
      productRepository,
      productById,
      fileService,
    );

    const productToCreate = new Product({
      companyId: new UniqueEntityID(),
      categoryId: new UniqueEntityID(),
      name: 'product1',
      price: 25.23,
      description: 'description',
      order: 1,
    });
    productRepository.create(productToCreate);

    await productDelete.execute({ productId: productToCreate.id.toValue() });

    expect(productRepository.products.length).toEqual(0);
  });
});
