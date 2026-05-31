import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    getPackages(): Promise<import("./entities/package.entity").Package[]>;
    createOrder(userId: string, dto: CreateOrderDto): Promise<import("./entities/order.entity").Order>;
    getOrders(userId: string): Promise<import("./entities/order.entity").Order[]>;
}
