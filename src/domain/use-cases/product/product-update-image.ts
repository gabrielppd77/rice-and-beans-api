import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@domain/repositories/product.repository';

import { ProductById } from './product-by-id';
import { FileService } from '@core/use-cases/file-service';

interface Request {
  productId: string;
  imageUrl: string;
  imageKey: string;
}

type Response = void;

@Injectable()
export class ProductUpdateImage {
  constructor(
    private productRepository: ProductRepository,
    private productById: ProductById,
    private fileService: FileService,
  ) {}
  async execute(req: Request): Promise<Response> {
    const { productId, imageUrl, imageKey } = req;

    const { product } = await this.productById.execute({ productId });
    if (product.imageKey) await this.fileService.deleteObject(product.imageKey);

    await this.productRepository.updateImage(productId, imageUrl, imageKey);
  }
}
