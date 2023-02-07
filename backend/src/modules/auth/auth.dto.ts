
import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types"

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}

export class UpdateDriverDto extends PartialType(AuthDto) { }