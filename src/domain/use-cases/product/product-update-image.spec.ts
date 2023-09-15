import { InMemoryProductRepository } from '@test/repositories/in-memory-product.repository';
import { ProductUpdateImage } from './product-update-image';
import { ProductById } from './product-by-id';
import { FileService } from '@core/use-cases/file-service';
import { Product } from '@domain/entities/product';
import { UniqueEntityID } from '@core/entities/unique-entity-id';

describe('ProductUpdateImage', () => {
  it('should update image url and image key correctly', async () => {
    const productRepository = new InMemoryProductRepository();
    const fileService = new FileService();
    const productById = new ProductById(productRepository);
    const productUpdateImage = new ProductUpdateImage(
      productRepository,
      productById,
      fileService,
    );
    const product = new Product({
      categoryId: new UniqueEntityID(),
      companyId: new UniqueEntityID(),
      name: 'Product1',
      order: 2,
      price: 52.52,
    });
    await productRepository.create(product);

    const imageKey = 'new-image-key';
    const imageUrl = 'new-image-url';

    await productUpdateImage.execute({
      imageKey,
      imageUrl,
      productId: product.id.toValue(),
    });

    const productRepo = productRepository.products[0];

    expect(productRepo.imageKey).toEqual(imageKey);
    expect(productRepo.imageUrl).toEqual(imageUrl);
  });
});
