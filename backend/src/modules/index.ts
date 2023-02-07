import { DriverModule } from "./driver/driver.module";
import { ParcelModule } from "./parcel/parcel.module";
import { SenderModule } from "./sender/sender.module";

const modules = [
	DriverModule,
	SenderModule,
	ParcelModule
]

export default modules;