import axios from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "./constants";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(function (config) {
	if (!config.headers["Authorization"]) {
		const jwt_token = window.localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

		if (jwt_token) {
			config.headers["authorization"] = 'Bearer ' + jwt_token;
		}
	}

	return config;
}, function (error) {
	return Promise.reject(error);
});

export default axiosInstance;
