import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SenderDocument = HydratedDocument<Sender>;

@Schema()
export class Sender {
	@Prop()
	name: string;
}

export const SenderSchema = SchemaFactory.createForClass(Sender);