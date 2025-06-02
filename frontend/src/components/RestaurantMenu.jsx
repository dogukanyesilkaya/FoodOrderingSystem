import { useQuery } from "@tanstack/react-query"
import { getRestaurantMenu } from "../api/userRequests"

export default function RestaurantMenu({ setCurrentPage, restaurantId }) {

	const { status, error, data, isPreviousData } = useQuery({
		queryKey: ["restaurantMenu"],
		queryFn: () => getRestaurantMenu(restaurantId),
	})

	if (status.status === "loading") return <h1>Loading...</h1>
	if (status.status === "error") {
		return <h1>{JSON.stringify(error)}</h1>
	}

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">
				Menu
			</h1>

			<div className="space-y-4">
				<div className="grid gap-3">
					{data?.map((menuItem) => (
						<div
							key={menuItem.id}
							className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
						>
							<div onClick={() => consle.log("item selected")}
								className="flex items-center space-x-6">
								<div className="min-w-0 flex-1">
									<h3 className="text-lg font-semibold text-gray-900 truncate">
										{menuItem.name}
									</h3>
								</div>

								<div className="flex items-center space-x-1 text-sm text-gray-600">
									<span className="font-medium">
										{menuItem.category}
									</span>
								</div>

								<div className="flex items-center space-x-1">
									<span className="text-sm font-medium text-gray-700">
										{menuItem.description}
									</span>
								</div>

								<div className="flex items-center space-x-1">
									<span className="text-sm font-medium text-gray-700">
										{menuItem.price}
									</span>
								</div>

							</div>

						</div>
					))}
				</div>

				<div className="flex justify-between pt-4">
					<button
						type="button"
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
					>
						Add new Menu Item
					</button>
				</div>
			</div>
		</div>
	);
}
