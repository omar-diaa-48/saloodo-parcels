import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from "mongoose";
import { History } from 'src/models/history';
import { ActionTakerType, HistoryActionType } from 'src/utils/types';
import { BaseService } from '../base/base.service';

@Injectable()
export class HistoryService extends BaseService<History>{
	constructor(
		@InjectModel('History') private historyModel: Model<History>,
	) {
		super(historyModel);
	}

	addOneDocument(dto: { parcel: string, action_type: HistoryActionType, action_taker_type: ActionTakerType, action_taker: string }): Promise<History & { _id: Types.ObjectId; }> {
		const { parcel, action_type, action_taker_type, action_taker } = dto;
		return this.historyModel.create({ parcel, action_type, action_taker, action_taker_type });
	}

	async findParcelHistory(parcelId: string): Promise<History[]> {
		const actions = await this.historyModel.find({ parcel: parcelId }).sort({ timestamp: 'asc' }).populate(["parcel", "action_taker"])

		return actions;
	}
}