import axios from "axios"
import { axiosInstance } from "./authRequests";

export function getRestaurants({ restaurantSortId }) {
	return axiosInstance
		.get("/user/restaurant", {
			params: {
				sortId: restaurantSortId
			}
		})
		.then(res => res.data)
}

export function getRestaurantMenu({ restaurantName, menuCategory }) {
	console.log("restname: {}", restaurantName)
	console.log("menuCategory: {}", menuCategory)
	return axiosInstance
		.get("/user/menu", {
			params: {
				id: restaurantName,
				category: menuCategory
			}
		})
		.then(res => res.data)
}

