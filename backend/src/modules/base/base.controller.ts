import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Document } from "mongoose";
import { BaseService } from "./base.service";

export class BaseController<T extends Document, CreateDto, UpdateDto> {
	constructor(private readonly baseService: BaseService<T>) { }

	@Get()
	async findAllDocuments() {
		return this.baseService.findAllDocuments();
	}

	@Get(':id')
	async findOneDocumentById(
		@Param('id') id: string
	) {
		return this.baseService.findOneDocumentById(id);
	}

	@Post()
	async addOneDocument(
		@Body() dto: CreateDto
	) {
		return this.baseService.addOneDocument(dto);
	}

	@Put(':id')
	async updateOneDocument(
		@Body() dto: UpdateDto,
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
