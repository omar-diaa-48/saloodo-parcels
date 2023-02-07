import { BadRequestException, Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
	constructor(private readonly model: Model<T>) { }

	async findAllDocuments(pagination: { limit: number, skip: number } = { limit: 10, skip: 0 }, relations: string[] = []) {
		return this.model.find().limit(pagination.limit).skip(pagination.skip).populate(relations);
	}

	async findOneDocumentById(id: string, relations: string[] = []) {
		const document = this.model.findById(id).populate(relations);

		if (!document) {
			throw new BadRequestException('Model with the specified id doesn`t exist')
		}

		return document;
	}

	async addOneDocument(dto: any) {
		return this.model.create(dto);
	}

	async updateOneDocument(id: string, dto: any) {
		const documentToBeUpdated = await this.findOneDocumentById(id);

		documentToBeUpdated.update(dto);
		await documentToBeUpdated.save();

		return documentToBeUpdated;
	}

	async removeOneDocument(id: string) {
		const documentToBeRemoved = await this.findOneDocumentById(id);

		const { _id } = documentToBeRemoved;

		await documentToBeRemoved.remove();

		return { id: _id };
	}
}