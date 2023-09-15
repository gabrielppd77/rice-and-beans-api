import { MaxLength, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class ProductUpdateDTO {
  @IsUUID()
  id: string;
  @IsUUID()
  categoryId: string;
  @MaxLength(55)
  name: string;
  /**
   * Format allowed
   * @example "99.99, 99, 9"
   **/
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  price: number;
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
