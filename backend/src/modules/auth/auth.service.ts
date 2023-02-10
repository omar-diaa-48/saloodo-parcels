import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Driver } from 'src/models/driver';
import { Sender } from 'src/models/sender';
import { DriverService } from '../driver/driver.service';
import { SenderService } from '../sender/sender.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private senderService: SenderService,
		private driverService: DriverService,
	) { }

	async signin(dto: AuthDto) {
		const { username, password, type } = dto;

		let user: Driver | Sender;

		switch (type) {
			case "driver":
				user = await this.driverService.findDriverByUserName(username);
				break;

			case "sender":
				user = await this.senderService.findSenderByUserName(username);
				break;

			default:
				throw new BadRequestException("User type must be defined")
		}

		if (!user) {
			throw new NotFoundException("User with this name not found")
		}

		return user;
	}
}