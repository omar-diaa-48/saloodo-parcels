export type UserType = "sender" | "driver";

export type AxiosResponseDataType<T> = {
	code: number,
	message: string,
	data: T;
}

export type ActionPayloadType<T> = {
	type: string;
	payload: T
}