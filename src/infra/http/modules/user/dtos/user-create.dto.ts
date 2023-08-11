import { Type } from 'class-transformer';
import {
  ValidateNested,
  MaxLength,
  IsEmail,
  Length,
  IsOptional,
} from 'class-validator';

class UserToCreateDTO {
  @MaxLength(55)
  @IsEmail()
  email: string;
  @MaxLength(55)
  name: string;
  @Length(4, 20)
  password: string;
  @Length(10, 11)
  phone: string;
}

class CompanyCreateDTO {
  @MaxLength(55)
  name: string;
  @Length(10, 11)
  @IsOptional()
  phone?: string;
  @MaxLength(255)
  @IsOptional()
  description?: string;
}

export class UserCreateDTO {
  @ValidateNested()
  @Type(() => UserToCreateDTO)
  user: UserToCreateDTO;
  @ValidateNested()
  @Type(() => CompanyCreateDTO)
  company: CompanyCreateDTO;
}
