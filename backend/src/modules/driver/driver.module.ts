import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from 'src/models/driver';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Driver', schema: DriverSchema }]),
	],
	controllers: [DriverController],
	providers: [DriverService],
})
export class DriverModule { }
