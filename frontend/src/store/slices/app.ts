import { createSlice } from '@reduxjs/toolkit';
import { ActionPayloadType, ModalType } from '../../utils/types';

export interface AppState {
	modal: {
		isOpened: boolean;
		current: ModalType;
		args: any;
	}
}

const initialState = {
	modal: {
		isOpened: false,
		current: "create-parcel-modal",
		args: {}
	}
} as AppState

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		openModalAction: (state, action: ActionPayloadType<{ args: any, current: ModalType }>) => {
			const { current, args } = action.payload;

			return {
				...state,
				modal: {
					isOpened: true,
					current,
					args
				}
			}
		},
		closeModalAction: (state, action: ActionPayloadType<void>) => {
			return {
				...state,
				modal: {
					...state.modal,
					isOpened: false,
					args: []
				}
			}
		}
	},
	extraReducers: {}
})

export const { openModalAction, closeModalAction } = appSlice.actions

export default appSlice.reducer