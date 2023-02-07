import { Module } from '@nestjs/common';
import { SenderModule } from '../sender/sender.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [SenderModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule { }
