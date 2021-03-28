import { CreateOrderDTO } from './dto/create-orders.dto';
import { Controller, Put, Get, Query, Param, Post, Body } from '@nestjs/common';

import { Filters } from './interfaces/filters.interface';
import { DeliveryStatus } from './interfaces/delivery-statuses.enum';
import { OrdersResponse } from './interfaces/orders-response.interface';
import { OredersService } from './orders.service';

@Controller('orders')
export class OredersController {
  constructor(private readonly ordersService: OredersService) {}

  @Post('/create')
  public create(@Body() order: CreateOrderDTO) {
    console.log(order);
    return this.ordersService.create(order);
  }

  @Get('/')
  public getAll(): Promise<OrdersResponse> {
    return this.ordersService.getAll();
  }

  @Post('/search')
  public search(@Body('filters') filters: Filters): Promise<OrdersResponse> {
    return this.ordersService.searchOrders(filters);
  }

  @Put('/status/:id')
  public changeStatus(
    @Param('id') id: string,
    @Query('status') status: DeliveryStatus,
  ) {
    return this.ordersService.changeStatus(id, status);
  }
}
