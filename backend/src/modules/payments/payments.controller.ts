import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Public()
  @Get('packages')
  @ApiOperation({ summary: 'List paket yang tersedia' })
  getPackages() {
    return this.paymentsService.getPackages();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buat order, return payment URL' })
  createOrder(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateOrderDto,
  ) {
    return this.paymentsService.createOrder(userId, dto.packageId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'History order milik user' })
  getOrders(@CurrentUser('id') userId: string) {
    return this.paymentsService.getOrders(userId);
  }
}
