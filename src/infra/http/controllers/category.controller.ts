import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryCreate } from '@domain/use-cases/category-create';
import { CategoryToCreateDTO } from '../dtos/category-create.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryCreate: CategoryCreate) {}

  @HttpCode(201)
  @Post('create')
  async create(@Body() body: CategoryToCreateDTO): Promise<void> {
    const { name, categoryParentId, photoUrl } = body;

    await this.categoryCreate.execute({
      name,
      categoryParentId,
      photoUrl,
    });
  }
}
