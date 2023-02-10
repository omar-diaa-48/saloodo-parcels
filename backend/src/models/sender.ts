import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SenderDocument = HydratedDocument<Sender>;

@Schema()
export class Sender extends Document {
	@Prop()
	username: string;

	@Prop()
	password: string;
}

export const SenderSchema = SchemaFactory.createForClass(Sender);