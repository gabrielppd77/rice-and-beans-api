import { Type } from 'class-transformer';
import { IsNumber, IsUUID, ValidateNested } from 'class-validator';

class CategoryUpdateManyOrderItemDTO {
  @IsUUID()
  id: string;
  @IsNumber()
  order: number;
}

export class CategoryUpdateManyOrdersDTO {
  @ValidateNested()
  @Type(() => CategoryUpdateManyOrderItemDTO)
  categories: CategoryUpdateManyOrderItemDTO[];
}
