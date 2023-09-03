import {
  Body,
  Controller,
  Post,
  Patch,
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
import { CategoryUpdateManyOrders } from '@domain/use-cases/category/category-update-many-orders';

import { CategoryCreateDTO } from './dtos/category-create.dto';
import { CategoryUpdateDTO } from './dtos/category-update.dto';
import { CategoryGetByIdDTO } from './dtos/category-get-by-id.dto';
import { CategoryListAllDTO } from './dtos/category-list-all.dto';
import { CategoryUpdateManyOrdersDTO } from './dtos/category-update-many-orders.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private categoryCreate: CategoryCreate,
    private categoryById: CategoryById,
    private categoryDelete: CategoryDelete,
    private categoryList: CategoryList,
    private categoryUpdate: CategoryUpdate,
    private categoryUpdateManyOrders: CategoryUpdateManyOrders,
  ) {}

  @Post()
  async create(@Body() body: CategoryCreateDTO, @Request() req): Promise<void> {
    const { name } = body;
    const payload = req.user as Payload;

    await this.categoryCreate.execute({
      name,
      companyId: payload.sub.companyId,
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CategoryGetByIdDTO> {
    const { category } = await this.categoryById.execute({ categoryId: id });
    return new CategoryGetByIdDTO(category);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryDelete.execute({ categoryId: id });
  }

  @Get()
  async listAll(@Request() req): Promise<CategoryListAllDTO[]> {
    const payload = req.user as Payload;
    const { categories: categoriesDomain } = await this.categoryList.execute({
      companyId: payload.sub.companyId,
    });
    return categoriesDomain.map((d) => new CategoryListAllDTO(d));
  }

  @Put(':id')
  async update(
    @Param('id') categoryId: string,
    @Body() body: CategoryUpdateDTO,
  ): Promise<void> {
    const { name } = body;
    await this.categoryUpdate.execute(
      {
        name,
      },
      categoryId,
    );
  }

  @Patch('update-many-orders')
  async updateManyOrders(
    @Body() body: CategoryUpdateManyOrdersDTO,
  ): Promise<void> {
    const { categories } = body;
    await this.categoryUpdateManyOrders.execute({ categories });
  }
}
