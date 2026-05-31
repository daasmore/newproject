import { IsOptional, IsString, IsEnum, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GuestQueryDto {
  @ApiPropertyOptional({ description: 'Halaman', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Item per halaman', default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Filter by group' })
  @IsOptional()
  @IsString()
  group?: string;

  @ApiPropertyOptional({ enum: ['pending', 'attending', 'not_attending'] })
  @IsOptional()
  @IsEnum(['pending', 'attending', 'not_attending'])
  rsvpStatus?: string;

  @ApiPropertyOptional({ description: 'Search by name' })
  @IsOptional()
  @IsString()
  search?: string;
}
