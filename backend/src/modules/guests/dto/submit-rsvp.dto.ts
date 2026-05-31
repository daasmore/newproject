import { IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmitRsvpDto {
  @ApiProperty({ enum: ['attending', 'not_attending'] })
  @IsEnum(['attending', 'not_attending'])
  status: 'attending' | 'not_attending';

  @ApiPropertyOptional({ minimum: 1, maximum: 5, example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  count?: number;

  @ApiPropertyOptional({ example: 'Selamat ya! Semoga berbahagia selalu 🙏' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;
}
