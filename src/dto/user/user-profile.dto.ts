import {  IsString, MaxLength } from 'class-validator';

export class UserProfileDto {
  @IsString()
  profileImage: string;

  @IsString()
  address: string;

  @IsString()
  @MaxLength(10)
  phoneNumber: string;


  @IsString()
  fullname: string;

  isActive: boolean;
}
