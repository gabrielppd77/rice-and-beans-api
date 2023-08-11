import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductCreate } from '@domain/use-cases/product/product-create';
import { ProductToCreateDTO } from './dtos/product-create.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productCreate: ProductCreate) {}

  @HttpCode(201)
  @Post()
  async create(
    @Body() body: ProductToCreateDTO,
    @Request() req,
  ): Promise<void> {
    const { categoryId, name, description, price, photoUrl } = body;
    const payload = req.user as Payload;

    await this.productCreate.execute({
      companyId: payload.sub.companyId,
      categoryId,
      name,
      description,
      price,
      photoUrl,
    });
  }
}
