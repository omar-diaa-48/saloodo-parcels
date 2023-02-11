import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ActionTakerType, HistoryActionType } from 'src/utils/types';
import { Driver } from './driver';
import { Parcel } from './parcel';
import { Sender } from './sender';

export type HistoryDocument = HydratedDocument<History>;

@Schema()
export class History extends Document {
	@Prop({ default: Date.now() })
	timestamp: number;

	@Prop({ enum: ["create", "assign", "deliver"] })
	action_type: HistoryActionType;

	@Prop({ enum: ["Sender", "Driver"] })
	action_taker_type: ActionTakerType;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		refPath: "action_taker_type"
	})
	action_taker: Driver | Sender;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Parcel" })
	parcel: Parcel;
}

export const HistorySchema = SchemaFactory.createForClass(History);