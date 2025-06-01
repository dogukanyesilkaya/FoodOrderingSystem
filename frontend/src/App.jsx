import { useState } from 'react'
import './App.css'
import { AuthPage } from "./components/AuthPage.jsx";

function App() {
	const [currentPage, setCurrentPage] = useState(<AuthPage />)

	return (
		<>
			<AuthPage />
		</>
	)
}

export default App
