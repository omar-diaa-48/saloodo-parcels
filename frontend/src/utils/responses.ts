import { UserType } from "./types";

export interface IAuthResponse {
	id: string,
	username: string;
	type: UserType;
	jwt_token: string;
}

export interface IUser {
	username: string;
}

export interface IParcel {
	id: string;
	item: string;
	pickup: string;
	dropoff: string;
	sender: IUser;
	driver: IUser;
}