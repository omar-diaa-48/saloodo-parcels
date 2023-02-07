import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Parcel } from 'src/models/parcel';
import { BaseService } from '../base/base.service';

@Injectable()
export class ParcelService extends BaseService<Parcel>{
	constructor(
		@InjectModel('Parcel') private parcelModel: Model<Parcel>,
	) {
		super(parcelModel);
	}
}