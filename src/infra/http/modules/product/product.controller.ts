import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
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

import { ProductCreateDTO } from './dtos/product-create.dto';
import { ProductUpdateDTO } from './dtos/product-update.dto';
import { ProductViewModelDTO } from './dtos/product-view-model.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private productCreate: ProductCreate,
    private productById: ProductById,
    private productDelete: ProductDelete,
    private productList: ProductList,
    private productUpdate: ProductUpdate,
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
  async getById(@Param('id') id: string): Promise<ProductViewModelDTO> {
    const { product } = await this.productById.execute({ productId: id });
    return new ProductViewModelDTO(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productDelete.execute({ productId: id });
  }

  @Get()
  async listAll(@Request() req): Promise<ProductViewModelDTO[]> {
    const payload = req.user as Payload;
    const { products: categoriesDomain } = await this.productList.execute({
      companyId: payload.sub.companyId,
    });
    const categories = categoriesDomain.map((d) => new ProductViewModelDTO(d));
    return categories;
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
}
