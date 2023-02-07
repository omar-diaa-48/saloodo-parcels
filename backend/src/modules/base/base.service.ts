import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
	constructor(private readonly model: Model<T>) { }

	async findAllDocuments() {
		return this.model.find();
	}

	async findOneDocument(id: string) {
		return this.model.findById(id);
	}

	async addOneDocument(dto: any) {
		return this.model.create(dto);
	}
}