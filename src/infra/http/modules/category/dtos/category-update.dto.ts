import { MaxLength, IsUUID } from 'class-validator';

export class CategoryUpdateDTO {
  @IsUUID()
  id: string;
  @MaxLength(55)
  name: string;
}
