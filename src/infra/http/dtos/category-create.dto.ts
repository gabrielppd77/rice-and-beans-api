import { MaxLength, IsUUID, IsOptional } from 'class-validator';

export class CategoryToCreateDTO {
  @MaxLength(55)
  name: string;
  @MaxLength(1000)
  @IsOptional()
  photoUrl?: string;
  @IsUUID()
  companyId: string;
}
