import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Driver } from './driver';
import { Sender } from './sender';

export type ParcelDocument = HydratedDocument<Parcel>;

@Schema()
export class Parcel extends Document {
	@Prop()
	item: string;

	@Prop()
	pickup: string;

	@Prop()
	dropoff: string;

	@Prop()
	is_delivered: boolean;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sender', required: true })
	sender: Sender;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
	driver: Driver;
}

export const ParcelSchema = SchemaFactory.createForClass(Parcel);