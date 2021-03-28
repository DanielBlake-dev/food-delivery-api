import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { UserRoles } from '../interfaces/user-role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id?: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: 'text' });
