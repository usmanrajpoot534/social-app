import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { IsChiString } from '../helper';

export class PaginationQueryDto {
  @ApiProperty({ required: false, type: 'integer' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, type: 'integer' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  per_page?: number = 30;

  @ApiProperty({ required: false })
  @IsString({})
  @IsOptional()
  search?: string = '';

  @ApiProperty({ required: false })
  @IsString({})
  @IsOptional()
  orderBy?: string = '';

  @ApiProperty({
    required: false,
    example: '["Pakistan", "United States of America"]',
    description: 'Country names',
  })
  @IsChiString({ optional: true })
  countryFilter?: string;

  @ApiProperty({ required: false, enum: Role })
  @IsOptional()
  @IsEnum(Role)
  userType?: Role;
}

export class NonPaginationQueryDto {
  @ApiProperty({ required: false })
  @IsString({})
  @IsOptional()
  search?: string = '';
}
