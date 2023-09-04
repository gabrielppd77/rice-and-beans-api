import { Type } from 'class-transformer';
import { IsNumber, IsUUID, ValidateNested } from 'class-validator';

class ProductUpdateManyOrderItemDTO {
  @IsUUID()
  id: string;
  @IsNumber()
  order: number;
}

export class ProductUpdateManyOrdersDTO {
  @ValidateNested()
  @Type(() => ProductUpdateManyOrderItemDTO)
  products: ProductUpdateManyOrderItemDTO[];
}
