import * as yup from "yup";

export const schema = {
	name: yup
		.string()
		.required("Must enter your name")
}

export const loginSchema = yup.object().shape(schema)