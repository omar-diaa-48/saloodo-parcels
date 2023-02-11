import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/api";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../utils/constants";
import { ISigninDto } from "../../utils/dtos";
import { IAuthResponse } from "../../utils/responses";
import { ActionPayloadType, AxiosResponseDataType } from "../../utils/types";

export interface UserState {
	isAuthenticated: boolean;
	profile: {
		id?: string;
		username?: string;
		type?: "sender" | "driver";
	}
}

const initialState = {
	isAuthenticated: true,
	profile: {}
} as UserState;

export const signinAction = createAsyncThunk<IAuthResponse, ISigninDto>('user/signin', async (userData, { rejectWithValue }) => {
	const { username, password, type } = userData;
	try {
		const authRes = await axiosInstance.post('auth/signin', { username, password, type });

		const data: AxiosResponseDataType<IAuthResponse> = authRes.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const refreshTokenAction = createAsyncThunk<IAuthResponse, void>('user/refreshToken', async (val, { dispatch, rejectWithValue }) => {
	try {
		const authRes = await axiosInstance.post('auth/refresh-token');

		const data: AxiosResponseDataType<IAuthResponse> = authRes.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signoutAction: (state, action: ActionPayloadType<void>) => {
			localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)

			return {
				...state,
				isAuthenticated: false,
				profile: {}
			};
		},
	},
	extraReducers: {
		[signinAction.fulfilled.type]: (state, action: ActionPayloadType<IAuthResponse>) => {
			const { id, username, type, jwt_token } = action.payload;

			axiosInstance.defaults.headers.common["authorization"] = "Bearer " + jwt_token;
			localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, jwt_token);

			return {
				...state,
				isAuthenticated: true,
				profile: {
					...state.profile,
					id,
					type,
					username,
				}
			};
		},

		[refreshTokenAction.fulfilled.type]: (state, action: ActionPayloadType<IAuthResponse>) => {
			const { id, username, jwt_token } = action.payload;

			axiosInstance.defaults.headers.common["authorization"] = "Bearer " + jwt_token;
			localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, jwt_token);

			return {
				...state,
				isAuthenticated: true,
				profile: {
					...state.profile,
					id,
					username,
				}
			};
		}
	}
})

export const { signoutAction } = userSlice.actions

export default userSlice.reducer