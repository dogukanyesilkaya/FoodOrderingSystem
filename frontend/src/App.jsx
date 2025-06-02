import { useState, useEffect } from "react"
import { AuthPage } from "./components/AuthPage"

export default function App() {
	const [currentPage, setCurrentPage] = useState(null)

	useEffect(() => {
		setCurrentPage(<AuthPage setCurrentPage={setCurrentPage} />);
	}, []);

	return (
		<div>
			{currentPage}
		</div>
	)
}
