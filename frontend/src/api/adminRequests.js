import axios from "axios"
import { axiosInstance } from "./authRequests";

export function addRestaurant({ deliveryTime, name, rating, region }) {
	return axiosInstance
		.post("/admin/restaurant", {
			deliveryTime,
			name,
			rating,
			region
		})
		.then(res => res.data)
}

export function addRestaurantMenu({ category, description, name, price, restaurantId }) {
	return axiosInstance
		.post("/admin/menu", {
			category,
			description,
			name,
			price,
			restaurantId
		})
		.then(res => res.data)
}
