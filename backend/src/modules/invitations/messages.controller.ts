// @ts-nocheck
import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvitationOwnerGuard } from './guards/invitation-owner.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Messages')
@Controller('invitations/:id/messages')
export class MessagesController {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List ucapan tamu (publik, pagination)' })
  async findAll(
    @Param('id') invitationId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.messageRepository.findAndCount({
      where: { invitationId, status: 'approved' },
      skip,
      take: limit,
      order: { createdAt: 'DESC' as any },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
