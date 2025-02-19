import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateComplaintDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  colony: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  account?: string;

  @IsString()
  @IsOptional()
  comments?: string;
}
