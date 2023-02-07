import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Put, Res } from '@nestjs/common';
import { Parcel } from 'src/models/parcel';
import { BaseController } from '../base/base.controller';
import { CreateParcelDto, UpdateParcelDto } from './parcel.dto';
import { ParcelService } from './parcel.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('parcels')
@Controller('parcels')
export class ParcelController extends BaseController<Parcel, CreateParcelDto, CreateParcelDto> {
	constructor(private parcelService: ParcelService) {
		super(parcelService)
	}

	@Post()
	async addOneDocument(
		@Body() dto: CreateParcelDto
	) {
		return this.parcelService.addOneDocument(dto);
	}

	@Put(':id')
	async updateOneDocument(
		@Body() dto: UpdateParcelDto,
		@Param('id') id: string
	) {
		return this.parcelService.updateOneDocument(id, dto);
	}
}
