import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/api";
import { IParcel } from "../../utils/responses";
import { ActionPayloadType, AxiosResponseDataType } from "../../utils/types";

export interface ParcelsState {
	data: IParcel[]
}

const initialState = {
	data: []
} as ParcelsState;

export const getAllParcelsAction = createAsyncThunk<IParcel[], void>('parcels', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get('parcels');

		const data: AxiosResponseDataType<IParcel[]> = response.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const parcelsSlice = createSlice({
	name: 'parcels',
	initialState,
	reducers: {},
	extraReducers: {
		[getAllParcelsAction.fulfilled.type]: (state, action: ActionPayloadType<IParcel[]>) => {
			const data = action.payload;

			return {
				...state,
				data
			};
		}
	}
})

export default parcelsSlice.reducer