import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
export declare class TemplatesService {
    private templateRepository;
    constructor(templateRepository: Repository<Template>);
    findAll(): Promise<Template[]>;
}
