
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types"

export class CreateDriverDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}

export class UpdateDriverDto extends PartialType(CreateDriverDto) { }