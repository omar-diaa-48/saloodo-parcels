import { combineReducers } from '@reduxjs/toolkit';
import app from './slices/app';
import parcels from './slices/parcels';

import user from "./slices/user";

const reducer = combineReducers({
	app,
	user,
	parcels
});

export default reducer;