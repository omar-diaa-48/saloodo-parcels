import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema()
export class Driver {
	@Prop()
	name: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);