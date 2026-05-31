import { IsOptional, IsObject, IsBoolean, IsInt, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSectionDto {
  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  orderIndex?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
