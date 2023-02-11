import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbConfigSchema } from 'src/models/dbconfig';
import { DriverModule } from '../driver/driver.module';
import { DriverService } from '../driver/driver.service';
import { SenderModule } from '../sender/sender.module';
import { SenderService } from '../sender/sender.service';
import { DbConfigService } from './config.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'DbConfig', schema: DbConfigSchema }]),
		SenderModule, DriverModule
	],
	controllers: [],
	providers: [DbConfigService],
})
export class DbConfigModule implements OnModuleInit {
	constructor(
		private readonly dbConfigService: DbConfigService,
		private readonly driverService: DriverService,
		private readonly senderService: SenderService,
	) { }

	async onModuleInit() {
		const dbConfig = await this.dbConfigService.findDbConfig();

		if (!dbConfig || !dbConfig.is_seeded) {
			const drivers = [
				{ username: "john", password: "12345678" },
				{ username: "samy", password: "12345678" },
				{ username: "helmy", password: "12345678" },
				{ username: "sara", password: "12345678" },
				{ username: "aya", password: "12345678" },
				{ username: "sabreen", password: "12345678" },
				{ username: "sally", password: "12345678" },
				{ username: "marta", password: "12345678" },
				{ username: "iain", password: "12345678" },
				{ username: "fady", password: "12345678" },
				{ username: "hesham", password: "12345678" },
			]

			const insertedDrivers = await this.driverService.seedUsers(drivers);
			console.log({ insertedDrivers });

			const senders = [
				{ username: "sara", password: "12345678" },
				{ username: "aya", password: "12345678" },
				{ username: "sabreen", password: "12345678" },
				{ username: "sally", password: "12345678" },
				{ username: "marta", password: "12345678" }
			] 

			const insertedSenders = await this.senderService.seedUsers(senders);
			console.log({ insertedSenders });

			await this.dbConfigService.addDbConfig({ is_seeded: true })
		}
	}
}
 