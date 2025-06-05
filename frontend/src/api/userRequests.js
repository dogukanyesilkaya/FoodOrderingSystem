import axios from "axios"
import { axiosInstance } from "./authRequests";

export function getRestaurants({ restaurantSortId }) {
	console.log("Axios Sort ID:", restaurantSortId)
	return axiosInstance
		.get("/user/restaurant", {
			params: {
				sortId: restaurantSortId
			}
		})
		.then(res => res.data)
}

export function getRestaurantMenu(id) {
	return axiosInstance
		.get("/user/menu", { params: { id: id } })
		.then(res => res.data)
}

