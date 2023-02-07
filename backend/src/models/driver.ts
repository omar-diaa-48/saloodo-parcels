import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema()
export class Driver extends Document {
	@Prop()
	name: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);