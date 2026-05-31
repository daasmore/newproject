// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
  ) {}

  async findAll() {
    return this.templateRepository.find({
      where: { isActive: true },
      order: { createdAt: 'ASC' },
    });
  }
}
