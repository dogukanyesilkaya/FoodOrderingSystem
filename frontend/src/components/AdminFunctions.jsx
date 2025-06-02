import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurants } from "../api/userRequests"
import { addRestaurant } from "../api/adminRequests"
import RestaurantMenu from "./RestaurantMenu"

export function AddForm() {
	const [showPopup, setShowPopup] = useState(false);
	const togglePopup = () => setShowPopup(!showPopup);

	const queryClient = useQueryClient()
	const addRestaurantMutation = useMutation({
		mutationFn: addRestaurant,
		onSuccess: () => {
			console.log("onSucess | AddRestaurant")
			queryClient.invalidateQueries(["restaurants"], { exact: true })
		},
	})

	const deliveryTimeRef = useRef()
	const nameRef = useRef()
	const ratingRef = useRef()
	const regionRef = useRef()

	function handleFormSubmit(e) {
		e.preventDefault()
		console.log("form submitted")
		addRestaurantMutation.mutate({
			deliveryTime: deliveryTimeRef.current.value,
			name: nameRef.current.value,
			rating: ratingRef.current.value,
			region: regionRef.current.value,
		})
	}
	return (

		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			{authMutation.isError && JSON.stringify(authMutation.error)}
			<div className="bg-white p-6 rounded shadow-lg w-96">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Popup Form</h2>
					<button
						onClick={togglePopup}
						className="text-red-500 text-xl font-bold"
					>
						&times;
					</button>
				</div>
				<form onSubmit={handleFormSubmit}>
					<div className="mb-4">
						<label className="block mb-1">Name:</label>
						<input
							type="text"
							ref={nameRef}
							className="w-full border px-3 py-2 rounded"
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-1">Estimated Delivery Time:</label>
						<input
							ref={deliveryTimeRef}
							className="w-full border px-3 py-2 rounded"
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-1">Rating:</label>
						<input
							ref={ratingRef}
							className="w-full border px-3 py-2 rounded"
						/>
					</div>

					<div className="mb-4">
						<label className="block mb-1">Region:</label>
						<input
							ref={regionRef}
							className="w-full border px-3 py-2 rounded"
						/>
					</div>

					<button
						disabled={addRestaurantMutation.isLoading}
					>
						{addRestaurantMutation.isLoading ? "Loading..." : "Submit"}
					</button>
				</form>
			</div>
		</div>
	)
}

