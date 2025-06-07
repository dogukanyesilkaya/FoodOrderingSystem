import axios from "axios"

const API_BASE_URL = 'http://localhost:8080';

// Create axios instance
export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response?.status === 401) {
			// Token expired or invalid
			localStorage.removeItem('token');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export function registerRequest({ name, password, role }) {
	return axiosInstance
		.post("/auth/register", {
			name,
			password,
			role
		})
		.then(res => {

			if (res.data) {
				localStorage.setItem('token', res.data);
			}

			return res.data;
		}

		)
}

export function loginRequest({ name, password, role }) {
	return axiosInstance
		.post("/auth/login", {
			name,
			password,
			role
		})
		.then(res => {

			if (res.data) {
				localStorage.setItem('token', res.data);
			}

			return res.data;
		})
}

