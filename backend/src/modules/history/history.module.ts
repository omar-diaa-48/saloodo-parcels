import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from 'src/models/history';
import { HistoryService } from './history.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }]),
	],
	providers: [HistoryService],
	exports: [HistoryService]
})
export class HistoryModule { }
