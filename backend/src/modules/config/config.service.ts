import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbConfig } from 'src/models/dbconfig';

@Injectable()
export class DbConfigService {
	constructor(
		@InjectModel('DbConfig') private dbConfigModel: Model<DbConfig>,
	) { }

	async findDbConfig(): Promise<DbConfig> {
		return this.dbConfigModel.findOne();
	}

	async addDbConfig({ is_seeded }): Promise<DbConfig> {
		return this.dbConfigModel.create({ is_seeded });
	}

	async setDbConfig(is_seeded: boolean): Promise<void> {
		const dbConfig = await this.findDbConfig();
		dbConfig.is_seeded = is_seeded;
		await dbConfig.save();
	}
}