import axios from "axios"

export function getRestaurants() {
	return axios
		.get("http://localhost:8080/user/restaurant")
		.then(res => res.data)
}

export function getRestaurantMenu(id) {
	return axios
		.get("http://localhost:8080/user/menu", { params: { id: id } })
		.then(res => res.data)
}

