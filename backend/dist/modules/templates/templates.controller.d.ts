import { TemplatesService } from './templates.service';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    findAll(): Promise<import("./entities/template.entity").Template[]>;
}
