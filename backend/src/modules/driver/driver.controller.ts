import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Put, Res } from '@nestjs/common';
import { Driver } from 'src/models/driver';
import { BaseController } from '../base/base.controller';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController extends BaseController<Driver> {

	constructor(private driverService: DriverService) {
		super(driverService)
	}

	@Get()
	async getAllDrivers() {
		return this.driverService.findAllDocuments();
	}
}
