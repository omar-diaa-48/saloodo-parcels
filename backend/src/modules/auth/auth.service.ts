import { Injectable, NotFoundException } from '@nestjs/common';
import { SenderService } from '../sender/sender.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private senderService: SenderService,
	) { }

	async signin(dto: AuthDto) {
		const { name } = dto;

		const sender = await this.senderService.findSenderByName(name);

		if (!sender) {
			throw new NotFoundException("Sender with this name not found")
		}

		return sender;
	}
}