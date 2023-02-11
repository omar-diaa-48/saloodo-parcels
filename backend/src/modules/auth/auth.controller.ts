import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
	) { }

	@Post("signin")
	async signin(
		@Body() dto: AuthDto
	) {
		return this.authService.signin(dto);
	}

	@Post("refresh-token")
	async jwtSignIn(
		@GetUser() user: JwtPayload
	) {
		return this.authService.jwtSignIn(user);
	}
}
