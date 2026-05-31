import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitationSection } from './entities/invitation-section.entity';
import { UpdateSectionDto } from './dto/update-section.dto';

type SectionType = 'bride' | 'groom' | 'event' | 'story' | 'gallery' | 'gifts' | 'rsvp';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(InvitationSection)
    private sectionRepository: Repository<InvitationSection>,
  ) {}

  async updateOrCreate(
    invitationId: string,
    type: string,
    dto: UpdateSectionDto,
  ) {
    let section = await this.sectionRepository.findOne({
      where: { invitationId, type: type as SectionType },
    });

    if (section) {
      if (dto.content !== undefined) section.content = dto.content;
      if (dto.orderIndex !== undefined) section.orderIndex = dto.orderIndex;
      if (dto.isVisible !== undefined) section.isVisible = dto.isVisible;
    } else {
      section = this.sectionRepository.create({
        invitationId,
        type: type as SectionType,
        content: dto.content || {},
        orderIndex: dto.orderIndex || 0,
        isVisible: dto.isVisible !== undefined ? dto.isVisible : true,
      });
    }

    await this.sectionRepository.save(section);
    return section;
  }
}
