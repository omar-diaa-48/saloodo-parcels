import { Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Put, Res } from '@nestjs/common';
import { Sender } from 'src/models/sender';
import { BaseController } from '../base/base.controller';
import { CreateSenderDto, UpdateSenderDto } from './sender.dto';
import { SenderService } from './sender.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('senders')
@Controller('senders')
export class SenderController extends BaseController<Sender, CreateSenderDto, CreateSenderDto> {
	constructor(private senderService: SenderService) {
		super(senderService)
	}

	@Post()
	async addOneDocument(
		@Body() dto: CreateSenderDto
	) {
		return this.senderService.addOneDocument(dto);
	}

	@Put(':id')
	async updateOneDocument(
		@Body() dto: UpdateSenderDto,
		@Param('id') id: string
	) {
		return this.senderService.updateOneDocument(id, dto);
	}
}
