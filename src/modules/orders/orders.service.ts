import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrdersResponse } from './interfaces/orders-response.interface';
import { Filters, FiltersDirection } from './interfaces/filters.interface';
import { DeliveryStatus, Statuses } from './interfaces/delivery-statuses.enum';
import { CreateOrderDTO } from './dto/create-orders.dto';
import { Order, OrderDocument } from './models/order.model';

@Injectable()
export class OredersService {
  constructor(
    @InjectModel(Order.name) private readonly ordersModel: Model<OrderDocument>,
  ) {}

  public async create(order: CreateOrderDTO): Promise<OrderDocument> {
    return await this.ordersModel.create(order);
  }

  public async getAll(): Promise<OrdersResponse> {
    const orders = await this.ordersModel.find().populate('dishes.dish');
    return {
      orders,
      total: orders.length,
      statuses: this.getStatuses(),
    };
  }

  public async changeStatus(id: string, status: DeliveryStatus) {
    const order = await this.ordersModel
      .findByIdAndUpdate(id, { $set: { status } }, { new: true })
      .populate('dishes.dish');

    setTimeout(async () => {
      await this.ordersModel
        .findByIdAndUpdate(
          id,
          { $set: { status: DeliveryStatus.Completed } },
          { new: true },
        )
        .populate('dishes.dish');
    }, 3000);

    return order;
  }

  public async searchOrders(filters: Filters) {
    const orders = await this.ordersModel
      .find(filters.status ? { status: filters.status } : {})
      .sort({
        created_at: filters.date ? FiltersDirection[filters.date.type] : 1,
      })
      .populate('dishes.dish');
    return {
      orders,
      total: orders.length,
      statuses: this.getStatuses(),
    };
  }

  private getStatuses(): Statuses {
    return {
      waiting: DeliveryStatus.Waiting,
      delivering: DeliveryStatus.Delivering,
      failure: DeliveryStatus.Failure,
      completed: DeliveryStatus.Completed,
    };
  }
}
