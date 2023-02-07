import { Document } from "mongoose";
import { Get, Res, HttpStatus, Post, Body, Put, NotFoundException, Delete, Param, HttpCode, Request, InternalServerErrorException } from '@nestjs/common';
import { BaseService } from "./base.service";

export class BaseController<T extends Document> {
	constructor(private readonly baseService: BaseService<T>) { }

	@Get()
	async getAll() {
		return this.baseService.findAllDocuments();
	}
}
