import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id?: string;

  @Prop({ type: Number })
  length: number;

  @Prop({ type: Number })
  chunkSize: number;

  @Prop({ type: String })
  filename: string;

  @Prop({ type: String })
  md5: string;

  @Prop({ type: String })
  contentType: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
