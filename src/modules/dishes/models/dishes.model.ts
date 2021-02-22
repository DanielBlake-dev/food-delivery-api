import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Category } from './../../categories/models/category.model';
import { Food } from '../../food/models/food.model';

export type DishesDocument = Dishes & Document;

@Schema()
export class Dishes {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id?: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String })
  image: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  category: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: Food.name }])
  ingredients: [string];
}

export const DishesSchema = SchemaFactory.createForClass(Dishes);
DishesSchema.index({ name: 'text' });
