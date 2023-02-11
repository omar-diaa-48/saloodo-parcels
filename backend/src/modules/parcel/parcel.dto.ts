
import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from 'class-validator';

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
}

export class UpdateParcelDto extends PartialType(CreateParcelDto) { }