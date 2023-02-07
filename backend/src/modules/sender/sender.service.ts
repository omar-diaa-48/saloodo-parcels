import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Sender } from 'src/models/sender';
import { BaseService } from '../base/base.service';

@Injectable()
export class SenderService extends BaseService<Sender>{
	constructor(
		@InjectModel('Sender') private senderModel: Model<Sender>,
	) {
		super(senderModel);
	}

	findSenderByName(name: string): Promise<Sender> {
		return this.senderModel.findOne({ name }).exec();
	}
}