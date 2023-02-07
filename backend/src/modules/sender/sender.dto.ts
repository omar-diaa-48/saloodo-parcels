
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types"

export class CreateSenderDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}

export class UpdateSenderDto extends PartialType(CreateSenderDto) { }