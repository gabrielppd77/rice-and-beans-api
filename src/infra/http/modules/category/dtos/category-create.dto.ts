import { MaxLength, IsOptional } from 'class-validator';

export class CategoryCreateDTO {
  @MaxLength(55)
  name: string;
  @MaxLength(1000)
  @IsOptional()
  photoUrl?: string;
}
