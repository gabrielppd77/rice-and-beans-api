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
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { MulterConfig } from '@infra/config/multer-config';

import { ProductCreate } from '@domain/use-cases/product/product-create';
import { ProductById } from '@domain/use-cases/product/product-by-id';
import { ProductDelete } from '@domain/use-cases/product/product-delete';
import { ProductList } from '@domain/use-cases/product/product-list';
import { ProductUpdate } from '@domain/use-cases/product/product-update';
import { ProductUpdateManyOrders } from '@domain/use-cases/product/product-update-many-orders';
import { ProductListByCategory } from '@domain/use-cases/product/product-list-by-category';
import { ProductUpdateImage } from '@domain/use-cases/product/product-update-image';

import { ProductCreateDTO } from './dtos/product-create.dto';
import { ProductUpdateDTO } from './dtos/product-update.dto';
import { ProductGetByIdDTO } from './dtos/product-get-by-id.dto';
import { ProductListAllDTO } from './dtos/product-list-all.dto';
import { ProductUpdateManyOrdersDTO } from './dtos/product-update-many-orders.dto';
import { ListByCategoryDTO } from './dtos/list-by-category.dto';
import { ProductFileUploadDTO } from './dtos/product-file-upload';

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
    private productListByCategory: ProductListByCategory,
    private productUpdateImage: ProductUpdateImage,
  ) {}

  @Post()
  async create(@Body() body: ProductCreateDTO, @Request() req): Promise<void> {
    const { categoryId, name, description, price } = body;
    const payload = req.user as Payload;

    await this.productCreate.execute({
      companyId: payload.sub.companyId,
      categoryId,
      name,
      description,
      price,
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
    const { products: productsDomain } = await this.productList.execute({
      companyId: payload.sub.companyId,
    });
    return productsDomain.map((d) => new ProductListAllDTO(d));
  }

  @Put(':id')
  async update(
    @Param('id') productId: string,
    @Body() body: ProductUpdateDTO,
  ): Promise<void> {
    const { categoryId, name, description, price } = body;
    await this.productUpdate.execute(
      {
        categoryId,
        name,
        description,
        price,
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

  @Get('list-by-category/:categoryId')
  async listByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<ListByCategoryDTO[]> {
    const { products: productsDomain } =
      await this.productListByCategory.execute({ categoryId });
    return productsDomain.map((d) => new ListByCategoryDTO(d));
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image of product',
    type: ProductFileUploadDTO,
  })
  @Patch('upload-image/:productId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    FileInterceptor('file', MulterConfig.configImageUpload('product')),
  )
  async uploadArquivo(
    @Param('productId') productId: string,
    @UploadedFile() file: Express.MulterS3.File,
  ) {
    await this.productUpdateImage.execute({
      productId,
      imageUrl: file.location,
      imageKey: file.key,
    });
  }
}
