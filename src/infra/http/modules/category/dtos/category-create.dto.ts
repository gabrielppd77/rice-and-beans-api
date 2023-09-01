import { MaxLength } from 'class-validator';

export class CategoryCreateDTO {
  @MaxLength(55)
  name: string;
}
