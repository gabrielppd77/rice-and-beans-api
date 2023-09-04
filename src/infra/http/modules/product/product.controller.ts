import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Patch,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProductCreate } from '@domain/use-cases/product/product-create';
import { ProductById } from '@domain/use-cases/product/product-by-id';
import { ProductDelete } from '@domain/use-cases/product/product-delete';
import { ProductList } from '@domain/use-cases/product/product-list';
import { ProductUpdate } from '@domain/use-cases/product/product-update';
import { ProductUpdateManyOrders } from '@domain/use-cases/product/product-update-many-orders';

import { ProductCreateDTO } from './dtos/product-create.dto';
import { ProductUpdateDTO } from './dtos/product-update.dto';
import { ProductGetByIdDTO } from './dtos/product-get-by-id.dto';
import { ProductListAllDTO } from './dtos/product-list-all.dto';
import { ProductUpdateManyOrdersDTO } from './dtos/product-update-many-orders.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private productCreate: ProductCreate,
    private productById: ProductById,
    private productDelete: ProductDelete,
    private productList: ProductList,
    private productUpdate: ProductUpdate,
    private productUpdateManyOrders: ProductUpdateManyOrders,
  ) {}

  @Post()
  async create(@Body() body: ProductCreateDTO, @Request() req): Promise<void> {
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

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProductGetByIdDTO> {
    const { product } = await this.productById.execute({ productId: id });
    return new ProductGetByIdDTO(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productDelete.execute({ productId: id });
  }

  @Get()
  async listAll(@Request() req): Promise<ProductListAllDTO[]> {
    const payload = req.user as Payload;
    const { products: categoriesDomain } = await this.productList.execute({
      companyId: payload.sub.companyId,
    });
    return categoriesDomain.map((d) => new ProductListAllDTO(d));
  }

  @Put(':id')
  async update(
    @Param('id') productId: string,
    @Body() body: ProductUpdateDTO,
  ): Promise<void> {
    const { categoryId, name, description, price, photoUrl } = body;
    await this.productUpdate.execute(
      {
        categoryId,
        name,
        description,
        price,
        photoUrl,
      },
      productId,
    );
  }

  @Patch('update-many-orders')
  async updateManyOrders(
    @Body() body: ProductUpdateManyOrdersDTO,
  ): Promise<void> {
    const { products } = body;
    await this.productUpdateManyOrders.execute({ products });
  }
}
