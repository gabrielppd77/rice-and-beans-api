import { Body, Controller, Get, HttpCode, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryCreate } from '@domain/use-cases/category-create';
import { ListCategoriesAndProducts } from '@domain/use-cases/list-categories-and-products';

import { CategoryToCreateDTO } from '../dtos/category-create.dto';
import { ListCategoriesAndProductsResponseDTO } from '../dtos/list-categories-and-products-response.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private categoryCreate: CategoryCreate,
    private listCategoriesAndProducts: ListCategoriesAndProducts,
  ) {}

  @HttpCode(201)
  @Post('create')
  async create(@Body() body: CategoryToCreateDTO): Promise<void> {
    const { name, companyId, photoUrl } = body;

    await this.categoryCreate.execute({
      name,
      companyId,
      photoUrl,
    });
  }

  @Get('list')
  async list(@Request() req): Promise<ListCategoriesAndProductsResponseDTO> {
    const payload = req.user as Payload;
    const { categories } = await this.listCategoriesAndProducts.execute({
      companyId: payload.sub.companyId,
    });
    return new ListCategoriesAndProductsResponseDTO(categories);
  }
}
