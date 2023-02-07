
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types"

export class CreateParcelDto {
	@IsString()
	@IsNotEmpty()
	pickup: string;

	@IsString()
	@IsNotEmpty()
	dropoff: string;

	@IsString()
	@IsNotEmpty()
	item: string;

	@IsString()
	@IsNotEmpty()
	sender: string;
}

export class UpdateParcelDto extends PartialType(CreateParcelDto) { }