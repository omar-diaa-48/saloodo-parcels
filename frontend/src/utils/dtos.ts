import { UserType } from "./types";

export interface ISigninDto {
	username: string
	password: string
	type: UserType;
}
