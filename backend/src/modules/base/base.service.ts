import { BadRequestException, Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
	constructor(private readonly model: Model<T>) { }

	async findAllDocuments() {
		return this.model.find();
	}

	async findOneDocument(id: string) {
		const document = this.model.findById(id);

		if (!document) {
			throw new BadRequestException('Model with the specified id doesn`t existi')
		}

		return document;
	}

	async addOneDocument(dto: any) {
		return this.model.create(dto);
	}

	async updateOneDocument(id: string, dto: any) {
		const documentToBeUpdated = await this.findOneDocument(id);

		documentToBeUpdated.update(dto);
		await documentToBeUpdated.save();

		return documentToBeUpdated;
	}

	async removeOneDocument(id: string) {
		const documentToBeRemoved = await this.findOneDocument(id);

		const { _id } = documentToBeRemoved;

		await documentToBeRemoved.remove();

		return { id: _id };
	}
}