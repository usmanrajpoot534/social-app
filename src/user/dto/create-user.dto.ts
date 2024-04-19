// create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'abc@example.com',
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    example: 'Usman Arif',
    description: 'Name of the user',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 20,
    description: 'Age of the user',
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    required: true,
    example: 'Pakistan',
    description: 'Name of the country',
  })
  @IsNotEmpty()
  @IsString()
  country: string;
}
