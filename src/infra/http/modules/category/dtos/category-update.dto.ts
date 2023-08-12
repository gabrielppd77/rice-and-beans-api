import { MaxLength, IsOptional, IsUUID } from 'class-validator';

export class CategoryUpdateDTO {
  @IsUUID()
  id: string;
  @MaxLength(55)
  name: string;
  @MaxLength(1000)
  @IsOptional()
  photoUrl?: string;
}
