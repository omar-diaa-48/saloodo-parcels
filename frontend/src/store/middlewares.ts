import { isAsyncThunkAction, isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const dismissed: string[] = [
	'user/refreshToken'
]

export const rtkQueryError: Middleware = (api) => (next) => (action) => {
	if (isAsyncThunkAction(action)) {

		const actionType: string = action.type;

		let isDimissed = false;

		if (dismissed.some((item) => actionType.includes(item))) {
			isDimissed = true;
		}

		if (isRejectedWithValue(action) && !isDimissed) {
			let message = ''

			console.log({ action });

			if (action?.payload?.response?.data?.message) {
				message = action?.payload?.response?.data?.message;
			}

			toast(message, { type: "error" })
		}

	}

	return next(action)
}