import { Module } from '@nestjs/common';
import { DriverModule } from '../driver/driver.module';
import { SenderModule } from '../sender/sender.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [SenderModule, DriverModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule { }
