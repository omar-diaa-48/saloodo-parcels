import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParcelSchema } from 'src/models/parcel';
import { DriverModule } from '../driver/driver.module';
import { HistoryModule } from '../history/history.module';
import { SenderModule } from '../sender/sender.module';
import { ParcelController } from './parcel.controller';
import { ParcelService } from './parcel.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Parcel', schema: ParcelSchema }]),
		DriverModule,
		SenderModule,
		HistoryModule
	],
	controllers: [ParcelController],
	providers: [ParcelService],
})
export class ParcelModule { }
