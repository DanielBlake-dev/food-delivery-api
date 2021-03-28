import { Order, OrderSchema } from './models/order.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OredersService } from './orders.service';
import { OredersController } from './orders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OredersService],
  controllers: [OredersController],
})
export class OredersModule {}
