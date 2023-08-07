import { Controller, Get, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListCategoriesAndProducts } from '@domain/use-cases/app/list-categories-and-products';

import { ListCategoriesAndProductsResponseDTO } from '../dtos/list-categories-and-products-response.dto';

@ApiTags('app')
@Controller('app')
export class AppController {
  constructor(private listCategoriesAndProducts: ListCategoriesAndProducts) {}

  @Get('list')
  async list(@Request() req): Promise<ListCategoriesAndProductsResponseDTO> {
    const payload = req.user as Payload;
    const { categories } = await this.listCategoriesAndProducts.execute({
      companyId: payload.sub.companyId,
    });
    return new ListCategoriesAndProductsResponseDTO(categories);
  }
}
