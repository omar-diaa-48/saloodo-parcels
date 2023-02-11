
import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSenderDto {
	@IsString()
	@IsNotEmpty()
	username: string;
}

export class UpdateSenderDto extends PartialType(CreateSenderDto) { }