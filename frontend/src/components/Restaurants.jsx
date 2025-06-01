import { useQuery } from "@tanstack/react-query"
import { getRestaurants } from "../api/userRequests"

export default function Restaurants() {

	const { status, error, data, isPreviousData } = useQuery({
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
				All your restaurants are listed below
			</h1>

			<div className="space-y-4">
				<div className="grid gap-3">
					{data.map((restaurant) => (
						<div
							key={restaurant.id}
							className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
						>
							<div className="flex items-center space-x-6">
								<div className="min-w-0 flex-1">
									<h3 className="text-lg font-semibold text-gray-900 truncate">
										{restaurant.name}
									</h3>
								</div>

								<div className="flex items-center space-x-1 text-sm text-gray-600">
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
									</svg>
									<span className="font-medium">{restaurant.region}</span>
								</div>

								<div className="flex items-center space-x-1">
									<svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
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
						type="button"
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
					>
						Add New Restaurant
					</button>
				</div>
			</div>
		</div>
	);
}
