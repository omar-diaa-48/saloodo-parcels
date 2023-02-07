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

export interface InputProps {
	id?: string;
	name?: string;
	value?: any;
	children?: React.ReactNode,
	onClick?: any;
	onChange?: any;
	disabled?: boolean;
	hidden?: boolean;
	className?: string;
	ref?: any;
	style?: any;
	readOnly?: boolean;
}