import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TemplatesService } from './templates.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List semua template aktif' })
  findAll() {
    return this.templatesService.findAll();
  }
}
