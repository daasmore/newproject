import { IsOptional, IsString, MaxLength, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInvitationDto {
  @ApiPropertyOptional({ example: 'Pernahakan Budi & Siti' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiPropertyOptional({ example: 'classic-elegance' })
  @IsOptional()
  @IsUUID()
  templateId?: string;
}
