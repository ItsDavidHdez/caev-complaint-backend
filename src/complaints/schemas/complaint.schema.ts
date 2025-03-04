import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComplaintDocument = Complaint & Document;

@Schema({ timestamps: true })
export class Complaint {
  @Prop({ unique: true })
  consecutiveId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  colony: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  account?: string;

  @Prop()
  comments?: string;

  @Prop({ default: () => new Date() })
  date: Date;

  @Prop({ default: 'Pendiente' })
  status: string;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
