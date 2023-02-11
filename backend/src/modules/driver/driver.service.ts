import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Driver } from 'src/models/driver';
import { BaseService } from '../base/base.service';
import { CreateDriverDto } from './driver.dto';

@Injectable()
export class DriverService extends BaseService<Driver>{
	constructor(
		@InjectModel('Driver') private driverModel: Model<Driver>,
	) {
		super(driverModel);
	}

	findDriverByUserName(username: string): Promise<Driver> {
		return this.driverModel.findOne({ username }).exec();
	}

	async seedUsers(createDriverDtos: CreateDriverDto[]): Promise<Driver[]> {
		return this.driverModel.insertMany(createDriverDtos)
	}
}