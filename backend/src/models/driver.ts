import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema()
export class Driver extends Document {
	@Prop()
	username: string;

	@Prop()
	password: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);