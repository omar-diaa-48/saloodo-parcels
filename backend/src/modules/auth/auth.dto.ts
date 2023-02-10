
import { IsNotEmpty, IsString } from 'class-validator';
import { UserType } from 'src/utils/types';

export class AuthDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsNotEmpty()
	type: UserType;
}