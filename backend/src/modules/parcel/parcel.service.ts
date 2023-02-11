import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Parcel } from 'src/models/parcel';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { BaseService } from '../base/base.service';

@Injectable()
export class ParcelService extends BaseService<Parcel>{
	constructor(
		@InjectModel('Parcel') private parcelModel: Model<Parcel>,
	) {
		super(parcelModel);
	}

	async findUserParcels(user: JwtPayload, pagination: { limit: number; skip: number; }, relations?: string[]): Promise<Parcel[]> {
		let parcels: Parcel[];
		let query = {}

		switch (user.type) {
			case "sender":
				query = { sender: user.id }
				break;
			case "driver":
				query = { driver: user.id }
				break;
			default:
				throw new BadRequestException("User type must be defined")
		}

		parcels = await this.parcelModel.find(query).limit(pagination.limit).skip(pagination.skip).populate(relations)

		return parcels;
	}
}