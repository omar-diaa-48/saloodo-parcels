import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Put, Res } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {
	constructor(private driverService: DriverService) { }

	@Get()
	async getAllDrivers() {
		return this.driverService.findAllDocuments();
	}
}
