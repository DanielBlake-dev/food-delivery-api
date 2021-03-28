import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id?: string;

  @Prop({ type: String })
  name: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Dishes' }])
  dishes: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ name: 'text' });
