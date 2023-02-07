import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Put, Res } from '@nestjs/common';
import { Driver } from 'src/models/driver';
import { BaseController } from '../base/base.controller';
import { CreateDriverDto, UpdateDriverDto } from './driver.dto';
import { DriverService } from './driver.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('drivers')
export class DriverController extends BaseController<Driver, CreateDriverDto, CreateDriverDto> {
	constructor(private driverService: DriverService) {
		super(driverService)
	}

	@Post()
	async addOneDocument(
		@Body() dto: CreateDriverDto
	) {
		return this.driverService.addOneDocument(dto);
	}

	@Put(':id')
	async updateOneDocument(
		@Body() dto: UpdateDriverDto,
		@Param('id') id: string
	) {
		return this.driverService.updateOneDocument(id, dto);
	}
}
