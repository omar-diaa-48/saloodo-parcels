import { Document } from "mongoose";
import { Get, Res, HttpStatus, Post, Body, Put, NotFoundException, Delete, Param, HttpCode, Request, InternalServerErrorException } from '@nestjs/common';
import { BaseService } from "./base.service";

export class BaseController<T extends Document> {
	constructor(private readonly baseService: BaseService<T>) { }

	@Get()
	async findAllDocuments() {
		return this.baseService.findAllDocuments();
	}

	@Get(':id')
	async findOneDocument(
		@Param('id') id: string
	) {
		return this.baseService.findOneDocument(id);
	}

	@Post()
	async addOneDocument(
		@Body() dto: any
	) {
		return this.baseService.addOneDocument(dto);
	}

	@Put(':id')
	async updateOneDocument(
		@Body() dto: any,
		@Param('id') id: string
	) {
		return this.baseService.updateOneDocument(id, dto);
	}

	@Delete(':id')
	async removeOneDocument(
		@Param('id') id: string
	) {
		return this.baseService.removeOneDocument(id);
	}
}
