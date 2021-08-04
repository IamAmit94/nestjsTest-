import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCrdentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
