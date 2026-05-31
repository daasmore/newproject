import { IsNotEmpty, IsOptional, IsString, MaxLength, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGuestDto {
  @ApiProperty({ example: 'Ahmad Rizki' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: '08123456789' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ example: 'Keluarga' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  groupName?: string;
}
