import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type HistoryDocument = HydratedDocument<History>;

@Schema()
export class History extends Document {
	@Prop({ default: Date.now() })
	timestamp: number;

	@Prop({ enum: ["create", "assign", "deliver"] })
	action_type: "create" | "assign" | "deliver";

	@Prop({ enum: ["sender", "driver"] })
	action_taker_type: "sender" | "driver";

	@Prop({ type: mongoose.Schema.Types.ObjectId })
	action_taker: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);