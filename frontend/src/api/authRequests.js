import axios from "axios"

export function registerRequest({ username, password, role }) {
	return axios
		.post("http://localhost:8080/auth/register", {
			username,
			password,
			role
		})
		.then(res => res.data)
}

export function loginRequest({ name, password, role }) {
	return axios
		.post("http://localhost:8080/auth/login", {
			name,
			password,
			role
		})
		.then(res => res.data)
}

