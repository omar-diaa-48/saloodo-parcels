import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Parcel } from 'src/models/parcel';
import { JwtPayload } from '../auth/dto/jwt-payload';
import { BaseController } from '../base/base.controller';
import { CreateParcelDto } from './parcel.dto';
import { ParcelService } from './parcel.service';

@ApiTags('parcels')
@Controller('parcels')
export class ParcelController extends BaseController<Parcel, CreateParcelDto, CreateParcelDto> {
	constructor(private parcelService: ParcelService) {
		super(parcelService)
	}

	@Get()
	async findUserParcels(
		@GetUser() user: JwtPayload
	) {
		return this.parcelService.findUserParcels(user, { limit: 10, skip: 0 }, ["sender"]);
	}

	@Post()
	async addUserParcel(
		@Body() dto: CreateParcelDto,
		@GetUser() sender: JwtPayload
	) {
		return this.parcelService.addUserParcel(sender, dto);
	}

	@Put(':id/assign')
	async assignUserParcel(
		@GetUser() driver: JwtPayload,
		@Param('id') id: string
	) {
		return this.parcelService.assignUserParcel(driver, id);
	}
}
