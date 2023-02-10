import * as yup from "yup";

export const schema = {
	username: yup
		.string()
		.required("Must enter your username"),
	password: yup
		.string()
		.min(8)
		.required("Must enter your password"),
	type: yup
		.string()
		.oneOf(["sender", "driver"])
}

export const loginSchema = yup.object().shape(schema)