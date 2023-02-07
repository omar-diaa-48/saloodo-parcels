export interface IAuthResponse {
	id: string,
	name: string;
	jwt_token: string;
}

export interface IUser {
	name: string;
}

export interface IParcel {
	item: string;
	pickup: string;
	dropoff: string;
	user: IUser;
}