import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/api";
import { IAddParcelDto } from "../../utils/dtos";
import { IActionHistory, IParcel } from "../../utils/responses";
import { ActionPayloadType, AxiosResponseDataType } from "../../utils/types";

export interface ParcelsState {
	data: IParcel[]
	specific?: { data?: IParcel, actions?: IActionHistory[] };
	isLoadingSpecific: boolean;
}

const initialState = {
	data: [],
	specific: {},
	isLoadingSpecific: false
} as ParcelsState;

export const getAllParcelsAction = createAsyncThunk<IParcel[], void>('parcels/getAllParcelsAction', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get('parcels');

		const data: AxiosResponseDataType<IParcel[]> = response.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const addParcelAction = createAsyncThunk<IParcel, IAddParcelDto>('parcels/addParcelAction', async (dto, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post('parcels', dto);

		const data: AxiosResponseDataType<IParcel> = response.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const assignParcelAction = createAsyncThunk<IParcel, { parcelId: string }>('parcels/assignParcelAction', async ({ parcelId }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.put(`parcels/${parcelId}/assign`);

		const data: AxiosResponseDataType<IParcel> = response.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const deliverParcelAction = createAsyncThunk<IParcel, { parcelId: string }>('parcels/deliverParcelAction', async ({ parcelId }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.put(`parcels/${parcelId}/deliver`);

		const data: AxiosResponseDataType<IParcel> = response.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const getParcelDetailsAction = createAsyncThunk<{ data: IParcel, actions: IActionHistory[] }, { parcelId: string }>('parcels/getParcelDetailsAction', async ({ parcelId }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get(`parcels/${parcelId}`);

		const data: AxiosResponseDataType<{ data: IParcel, actions: IActionHistory[] }> = response.data;

		return data.data;
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const parcelsSlice = createSlice({
	name: 'parcels',
	initialState,
	reducers: {
		clearParcelDetailsAction: (state) => ({
			...state,
			specific: {},
			isLoadingSpecific: false
		})
	},
	extraReducers: {
		[getAllParcelsAction.fulfilled.type]: (state, action: ActionPayloadType<IParcel[]>) => {
			const data = action.payload;

			return {
				...state,
				data
			};
		},

		[addParcelAction.fulfilled.type]: (state, action: ActionPayloadType<IParcel>) => {
			const parcel = action.payload;

			return {
				...state,
				data: [...state.data, parcel]
			};
		},

		[assignParcelAction.fulfilled.type]: (state, action: ActionPayloadType<IParcel>) => {
			const parcel = action.payload;

			const data = state.data.map((item) => {
				if (item._id === parcel._id) {
					return parcel;
				}

				return item;
			})

			return {
				...state,
				data
			};
		},

		[deliverParcelAction.fulfilled.type]: (state, action: ActionPayloadType<IParcel>) => {
			const parcel = action.payload;

			const data = state.data.map((item) => {
				if (item._id === parcel._id) {
					return parcel;
				}

				return item;
			})

			return {
				...state,
				data
			};
		},

		[getParcelDetailsAction.fulfilled.type]: (state, action: ActionPayloadType<{ data: IParcel, actions: IActionHistory[] }>) => {
			const { data, actions } = action.payload;

			return {
				...state,
				specific: {
					data,
					actions,
				},
				isLoadingSpecific: false
			};
		},

		[getParcelDetailsAction.pending.type]: (state) => {
			return {
				...state,
				isLoadingSpecific: true
			};
		},

		[getParcelDetailsAction.rejected.type]: (state) => {

			return {
				...state,
				isLoadingSpecific: false
			};
		}
	}
})

export const { clearParcelDetailsAction } = parcelsSlice.actions

export default parcelsSlice.reducer