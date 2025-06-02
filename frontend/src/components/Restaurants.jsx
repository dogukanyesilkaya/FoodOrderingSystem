import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurants } from "../api/userRequests"
import { addRestaurant } from "../api/adminRequests"
import RestaurantMenu from "./RestaurantMenu"

export default function Restaurants({ setCurrentPage }) {

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
	const { status, error, data } = useQuery({
		queryKey: ["restaurants"],
		queryFn: () => getRestaurants(),
	})

	if (status.status === "loading") return <h1>Loading...</h1>
	if (status.status === "error") {
		return <h1>{JSON.stringify(error)}</h1>
	}

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">
				Open Restaurants
			</h1>

			<div className="space-y-4">
				<div className="grid gap-3">
					{data?.map((restaurant) => (
						<div
							key={restaurant.id}
							className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-center space-x-6">
								<div className="min-w-0 flex-1">
									<button
										onClick={() => { setCurrentPage(<RestaurantMenu setCurrentPage={setCurrentPage} restaurantId={restaurant.name} />) }}
										className="text-lg font-semibold text-gray-900 truncate">
										{restaurant.name}
									</button>
								</div>

								<div className="flex items-center space-x-1 text-sm text-gray-600">
									<span className="font-medium">{restaurant.region}</span>
								</div>

								<div className="flex items-center space-x-1">

									<span className="text-sm font-medium text-gray-700">
										{restaurant.rating}
									</span>
								</div>
							</div>

						</div>
					))}
				</div>

				<div className="flex justify-between pt-4">
					<button
						onClick={togglePopup}
						disabled={!(localStorage.getItem("role") === "ADMIN")}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
					>
						Add New Restaurant
					</button>

					{showPopup && (

						<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
					)}
				</div>
			</div>
		</div>
	);
}
