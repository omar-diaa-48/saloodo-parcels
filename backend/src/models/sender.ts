import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type SenderDocument = HydratedDocument<Sender>;

@Schema()
export class Sender extends Document {
	@Prop()
	name: string;
}

export const SenderSchema = SchemaFactory.createForClass(Sender);