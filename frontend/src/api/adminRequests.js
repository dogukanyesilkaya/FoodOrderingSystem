import axios from "axios"

export function addRestaurant({ deliveryTime, name, rating, region }) {
	return axios
		.post("http://localhost:8080/admin/restaurant", {
			deliveryTime,
			name,
			rating,
			region
		})
		.then(res => res.data)
}

export function addRestaurantMenu({ category, description, name, price, restaurantId }) {
	return axios
		.post("http://localhost:8080/admin/menu", {
			category,
			description,
			name,
			price,
			restaurantId
		})
		.then(res => res.data)
}
