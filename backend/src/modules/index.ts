import { AuthModule } from "./auth/auth.module";
import { DbConfigModule } from "./config/config.module";
import { DriverModule } from "./driver/driver.module";
import { ParcelModule } from "./parcel/parcel.module";
import { SenderModule } from "./sender/sender.module";

const modules = [
	AuthModule,
	
	DriverModule,
	SenderModule,
	ParcelModule,
	
	DbConfigModule
]

export default modules;