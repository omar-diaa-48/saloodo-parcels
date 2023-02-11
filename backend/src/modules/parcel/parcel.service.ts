import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { Parcel } from 'src/models/parcel';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { BaseService } from '../base/base.service';
import { DriverService } from '../driver/driver.service';
import { HistoryService } from '../history/history.service';
import { SenderService } from '../sender/sender.service';
import { CreateParcelDto } from './parcel.dto';

@Injectable()
export class ParcelService extends BaseService<Parcel>{
	constructor(
		@InjectModel('Parcel') private parcelModel: Model<Parcel>,

		private readonly driverService: DriverService,
		private readonly senderService: SenderService,
		private readonly historyService: HistoryService,
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

		parcels = await this.parcelModel.find(query).populate(relations)

		if (user.type === "driver") {
			const freeparcels: Parcel[] = await this.parcelModel.find({ driver: null }).populate(relations)
			parcels = parcels.concat(freeparcels)
		}

		return parcels;
	}

	async addUserParcel(user: JwtPayload, createParcelDto: CreateParcelDto): Promise<Parcel> {
		let parcel: Parcel;

		if (user.type !== "sender") {
			throw new BadRequestException("User creating parcel must be of sender type")
		}

		const sender = await this.senderService.findOneDocumentById(user.id)

		parcel = await this.parcelModel.create({ ...createParcelDto, is_delivered: false, sender: sender.id })

		await parcel.populate(["sender", "driver"])

		await this.historyService.addOneDocument({ action_taker: sender.id, action_taker_type: "sender", action_type: "create" })

		return parcel;
	}

	async assignUserParcel(user: JwtPayload, parcelId: string): Promise<Parcel> {
		let parcel: Parcel;

		if (user.type !== "driver") {
			throw new BadRequestException("User creating parcel must be of driver type")
		}

		const driver = await this.driverService.findOneDocumentById(user.id)

		parcel = await this.parcelModel.findById(parcelId).populate(["sender", "driver"])

		if (!parcel) {
			throw new BadRequestException(`Parcel with id ${parcelId} not found`)
		}

		if (parcel.driver) {
			throw new BadRequestException(`Parcel with id ${parcelId} is already assiged to ${parcel.driver.username}`)
		}

		parcel.driver = driver;
		await parcel.save();

		await this.historyService.addOneDocument({ action_taker: driver.id, action_taker_type: "driver", action_type: "assign" })

		return parcel;
	}

	async deliverUserParcel(user: JwtPayload, parcelId: string): Promise<Parcel> {
		let parcel: Parcel;

		if (user.type !== "driver") {
			throw new BadRequestException("User creating parcel must be of driver type")
		}

		const driver = await this.driverService.findOneDocumentById(user.id)

		parcel = await this.parcelModel.findById(parcelId).populate(["sender", "driver"])

		if (!parcel) {
			throw new BadRequestException(`Parcel with id ${parcelId} not found`)
		}

		if (parcel.driver.id !== driver.id) {
			throw new BadRequestException(`Parcel with id ${parcelId} is already assiged to ${parcel.driver.username}`)
		}

		if (parcel.is_delivered) {
			throw new BadRequestException(`Parcel with id ${parcelId} is already delivered`)
		}

		parcel.is_delivered = true;
		await parcel.save();

		await this.historyService.addOneDocument({ action_taker: driver.id, action_taker_type: "driver", action_type: "deliver" })

		return parcel;
	}
}