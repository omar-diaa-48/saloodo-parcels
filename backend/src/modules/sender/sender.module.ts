import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SenderSchema } from 'src/models/sender';
import { SenderController } from './sender.controller';
import { SenderService } from './sender.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Sender', schema: SenderSchema }]),
	],
	controllers: [SenderController],
	providers: [SenderService],
	exports: [SenderService]
})
export class SenderModule { }
