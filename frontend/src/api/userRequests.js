import axios from "axios"
import { axiosInstance } from "./authRequests";
export function getRestaurants() {
	return axiosInstance
		.get("/user/restaurant")
		.then(res => res.data)
}

export function getRestaurantMenu(id) {
	return axiosInstance
		.get("/user/menu", { params: { id: id } })
		.then(res => res.data)
}

