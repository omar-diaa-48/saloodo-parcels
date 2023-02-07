import { combineReducers } from '@reduxjs/toolkit';
import parcels from './slices/parcels';

import user from "./slices/user";

const reducer = combineReducers({
	user,
	parcels
});

export default reducer;