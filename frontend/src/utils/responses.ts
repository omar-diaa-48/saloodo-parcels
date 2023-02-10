export interface IAuthResponse {
	id: string,
	username: string;
	jwt_token: string;
}

export interface IUser {
	username: string;
}

export interface IParcel {
	item: string;
	pickup: string;
	dropoff: string;
	user: IUser;
}