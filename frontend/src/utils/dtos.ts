import { UserType } from "./types";

export interface ISigninDto {
	username: string
	password: string
	type: UserType;
}

export interface IAddParcelDto {
	item: string
	pickup: string
	dropoff: string;
}
