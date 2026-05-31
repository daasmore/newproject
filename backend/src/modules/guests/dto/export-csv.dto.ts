import { IsOptional, IsString } from 'class-validator';

export class ImportGuestsDto {
  @IsOptional()
  @IsString()
  csvData?: string;
}
