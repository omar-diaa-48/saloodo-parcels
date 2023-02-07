import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParcelSchema } from 'src/models/parcel';
import { ParcelController } from './parcel.controller';
import { ParcelService } from './parcel.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Parcel', schema: ParcelSchema }]),
	],
	controllers: [ParcelController],
	providers: [ParcelService],
})
export class ParcelModule { }
