import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Sender } from 'src/models/sender';
import { BaseService } from '../base/base.service';
import { CreateSenderDto } from './sender.dto';

@Injectable()
export class SenderService extends BaseService<Sender>{
	constructor(
		@InjectModel('Sender') private senderModel: Model<Sender>,
	) {
		super(senderModel);
	}

	findSenderByUserName(username: string): Promise<Sender> {
		return this.senderModel.findOne({ username }).exec();
	}

	async seedUsers(createSenderDtos: CreateSenderDto[]): Promise<Sender[]> {
		return this.senderModel.insertMany(createSenderDtos)
	}
}