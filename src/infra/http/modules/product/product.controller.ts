import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductCreate } from '@domain/use-cases/product/product-create';
import { ProductToCreateDTO } from './dtos/product-create.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productCreate: ProductCreate) {}

  @HttpCode(201)
  @Post()
  async create(@Body() body: ProductToCreateDTO): Promise<void> {
    const { categoryId, name, description, price, photoUrl } = body;

    await this.productCreate.execute({
      categoryId,
      name,
      description,
      price,
      photoUrl,
    });
  }
}
