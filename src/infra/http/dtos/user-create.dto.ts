import { MaxLength, IsEmail, Length } from 'class-validator';

export class UserCreateDTO {
  @MaxLength(55)
  @IsEmail()
  email: string;
  @Length(4, 20)
  password: string;
}
