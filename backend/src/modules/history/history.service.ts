import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { History } from 'src/models/history';
import { BaseService } from '../base/base.service';

@Injectable()
export class HistoryService extends BaseService<History>{
	constructor(
		@InjectModel('History') private historyModel: Model<History>,
	) {
		super(historyModel);
	}
}