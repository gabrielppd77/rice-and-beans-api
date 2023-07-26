import { Injectable } from '@nestjs/common';

import { Product } from '@domain/entities/product';

@Injectable()
export abstract class ProductRepository {
  abstract create(user: Product): Promise<void>;
}
