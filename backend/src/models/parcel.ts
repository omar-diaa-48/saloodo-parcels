import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';
import * as mongoose from 'mongoose';
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

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sender' })
	sender: Sender;
}

export const ParcelSchema = SchemaFactory.createForClass(Parcel);