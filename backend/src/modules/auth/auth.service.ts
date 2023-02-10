import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from "jsonwebtoken";
import { Driver } from 'src/models/driver';
import { Sender } from 'src/models/sender';
import { UserType } from 'src/utils/types';
import { DriverService } from '../driver/driver.service';
import { SenderService } from '../sender/sender.service';
import { AuthDto } from './auth.dto';
import { JwtPayload } from './dto/jwt-payload';

@Injectable()
export class AuthService {
	constructor(
		private senderService: SenderService,
		private driverService: DriverService,
		private configService: ConfigService,
	) { }

	async signin(dto: AuthDto): Promise<JwtPayload> {
		const { username, password, type } = dto;

		const user = await this.detectUser(username, type);

		if (!user) {
			throw new NotFoundException("User with this name not found")
		}

		const payload: JwtPayload = {
			id: user.id,
			username: user.username,
			type
		}

		const newAccessToken = jwt.sign(payload, this.configService.get<string>("TOKEN_SECRET"));

		payload.jwt_token = newAccessToken;

		return payload;
	}

	async jwtSignIn(user: JwtPayload): Promise<JwtPayload> {
		if (!user) {
			throw new UnauthorizedException()
		}

		const currentUser = await this.detectUser(user.username, user.type)

		if (!currentUser) {
			throw new UnauthorizedException()
		}

		const payload: JwtPayload = {
			id: user.id,
			username: user.username,
			type: user.type
		}

		const newAccessToken = jwt.sign(payload, this.configService.get<string>("TOKEN_SECRET"));

		user.jwt_token = newAccessToken;

		return user;
	}

	async detectUser(username: string, type: UserType): Promise<Driver | Sender> {
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

		return user;
	}
}