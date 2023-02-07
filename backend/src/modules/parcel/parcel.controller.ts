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

	@Get()
	async findAllDocuments() {
		return this.parcelService.findAllDocuments({ limit: 10, skip: 0 }, ["sender"]);
	}

	@Get(':id')
	async findOneDocument(
		@Param('id') id: string
	) {
		return this.parcelService.findOneDocument(id, ["sender"]);
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
