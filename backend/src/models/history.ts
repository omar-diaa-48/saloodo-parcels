import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { HistoryActionType, UserType } from 'src/utils/types';

export type HistoryDocument = HydratedDocument<History>;

@Schema()
export class History extends Document {
	@Prop({ default: Date.now() })
	timestamp: number;

	@Prop({ enum: ["create", "assign", "deliver"] })
	action_type: HistoryActionType;

	@Prop({ enum: ["sender", "driver"] })
	action_taker_type: UserType;

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	action_taker: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);