import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Dishes } from '../../dishes/models/dishes.model';
import { DeliveryStatus } from '../interfaces/delivery-statuses.enum';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id?: string;

  @Prop({ type: Number })
  cash?: number;

  @Prop({
    type: {
      number: { type: String },
      cvv: { type: String },
      expData: { type: String },
    },
  })
  card?: {
    number: string;
    cvv: string;
    expDate: string;
  };

  @Prop({
    type: {
      name: { type: String },
      phone: { type: String },
    },
  })
  client: {
    name: string;
    phone: string;
  };

  @Prop({
    type: {
      district: { type: String },
      street: { type: String },
      numberHouse: { type: String },
      numberApartment: { type: String },
    },
  })
  address: {
    district: string;
    street: string;
    numberHouse: string;
    numberApartment: string;
  };

  @Prop({ type: String })
  status: DeliveryStatus;

  @Prop({ type: Number })
  total: number;

  @Prop([
    {
      dish: { type: MongooseSchema.Types.ObjectId, ref: Dishes.name },
      total: { type: Number },
      comment: { type: String },
      count: { type: Number },
    },
  ])
  dishes: {
    dish: string;
    total: number;
    comment: string;
    count: number;
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ created_at: 1 });
