import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from "mongoose";
import { History } from 'src/models/history';
import { HistoryActionType, UserType } from 'src/utils/types';
import { BaseService } from '../base/base.service';

@Injectable()
export class HistoryService extends BaseService<History>{
	constructor(
		@InjectModel('History') private historyModel: Model<History>,
	) {
		super(historyModel);
	}

	addOneDocument(dto: { action_type: HistoryActionType, action_taker_type: UserType, action_taker: string }): Promise<History & { _id: Types.ObjectId; }> {
		const { action_type, action_taker_type, action_taker } = dto;
		return this.historyModel.create({ action_type, action_taker, action_taker_type });
	}
}