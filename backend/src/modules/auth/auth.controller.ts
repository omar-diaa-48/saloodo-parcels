import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
	) { }

	@Post("signin")
	async addOneDocument(
		@Body() dto: AuthDto
	) {
		return this.authService.signin(dto);
	}
}
