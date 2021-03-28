import { CreateOrderDTO } from '../orders/dto/create-orders.dto';
import { HttpService } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { SocketEvents } from './socket.events';
import { ChangeStatusDTO } from './dto/change-status.dto';
import { OrdersResponse } from '../orders/interfaces/orders-response.interface';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly httpService: HttpService) {}

  @SubscribeMessage(SocketEvents.GetOrders)
  public async getOrders() {
    const { data } = await this.httpService
      .get<OrdersResponse>('/orders/')
      .toPromise();
    return data;
  }

  @SubscribeMessage(SocketEvents.CreateOrder)
  public async createOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody() order: CreateOrderDTO,
  ) {
    await this.httpService.post(`/orders/create`, order).toPromise();
    client.emit(SocketEvents.GetOrders);
  }

  @SubscribeMessage(SocketEvents.ChangeStatus)
  public async changeStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() { id, status }: ChangeStatusDTO,
  ) {
    console.log(id, status);
    await this.httpService
      .put(`/orders/status/${id}?status=${status}`)
      .toPromise();
    client.emit(SocketEvents.GetOrders);
  }
}
