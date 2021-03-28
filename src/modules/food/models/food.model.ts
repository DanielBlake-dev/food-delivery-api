import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FoodDocument = Food & Document;

@Schema()
export class Food {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id?: string;

  @Prop()
  name: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
FoodSchema.index({ name: 'text' });
