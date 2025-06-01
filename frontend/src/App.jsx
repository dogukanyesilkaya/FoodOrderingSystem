import { useState } from "react"
import { AuthPage } from "./components/AuthPage"
import Restaurants from "./components/Restaurants";

export default function App() {
	const [currentPage, setCurrentPage] = useState(null)

	const authPage = () => {
		return <AuthPage setCurrentPage={setCurrentPage} />
	}
	return (
		<div>
			{<Restaurants />}
		</div>
	)
}
