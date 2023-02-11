import * as yup from "yup";

export const schema = {
	item: yup
		.string()
		.required(),
	pickup: yup
		.string()
		.required(),
	dropoff: yup
		.string()
		.required(),
}

export const parcelSchema = yup.object().shape(schema)