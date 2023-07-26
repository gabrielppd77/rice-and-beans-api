import { MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CategoryToCreateDTO {
  @MaxLength(55)
  name: string;
  @MaxLength(55)
  @IsOptional()
  photoUrl?: string;
  @IsUUID()
  @IsOptional()
  categoryParentId?: string;
}
