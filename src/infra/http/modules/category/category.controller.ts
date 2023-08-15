import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryCreate } from '@domain/use-cases/category/category-create';
import { CategoryById } from '@domain/use-cases/category/category-by-id';
import { CategoryDelete } from '@domain/use-cases/category/category-delete';
import { CategoryList } from '@domain/use-cases/category/category-list';
import { CategoryUpdate } from '@domain/use-cases/category/category-update';

import { CategoryCreateDTO } from './dtos/category-create.dto';
import { CategoryUpdateDTO } from './dtos/category-update.dto';
import { CategoryViewModelDTO } from './dtos/category-view-model.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private categoryCreate: CategoryCreate,
    private categoryById: CategoryById,
    private categoryDelete: CategoryDelete,
    private categoryList: CategoryList,
    private categoryUpdate: CategoryUpdate,
  ) {}

  @Post()
  async create(@Body() body: CategoryCreateDTO, @Request() req): Promise<void> {
    const { name, photoUrl } = body;
    const payload = req.user as Payload;

    await this.categoryCreate.execute({
      name,
      companyId: payload.sub.companyId,
      photoUrl,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CategoryViewModelDTO> {
    const { category } = await this.categoryById.execute({ categoryId: id });
    return new CategoryViewModelDTO(category);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryDelete.execute({ categoryId: id });
  }

  @Get()
  async listAll(@Request() req): Promise<CategoryViewModelDTO[]> {
    const payload = req.user as Payload;
    const { categories: categoriesDomain } = await this.categoryList.execute({
      companyId: payload.sub.companyId,
    });
    const categories = categoriesDomain.map((d) => new CategoryViewModelDTO(d));
    return categories;
  }

  @Put(':id')
  async update(
    @Param('id') categoryId: string,
    @Body() body: CategoryUpdateDTO,
  ): Promise<void> {
    const { name, photoUrl } = body;
    await this.categoryUpdate.execute(
      {
        name,
        photoUrl,
      },
      categoryId,
    );
  }
}
