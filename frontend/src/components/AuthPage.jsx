import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { registerRequest, loginRequest } from "../api/authRequests"
import Restaurants from "./Restaurants"
import { Container, Form, Button, Alert, Row, Col, Modal } from "react-bootstrap";
import { LoginScreen, RegisterPopup } from "./RestaurantFunctions";

export function AuthPage({ setCurrentPage }) {
	const [isRegister, setIsRegister] = useState(false)

	const usernameRef = useRef(null)
	const passwordRef = useRef(null)
	const roleRef = useRef(null)

	const queryClient = useQueryClient();
	const loginMutation = useMutation({
		mutationFn: loginRequest,
		mutationKey: ["login"],
		onSuccess: () => {
			localStorage.setItem("role", roleRef.current.value)
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />)
		},
	})

	const registerMutation = useMutation({
		mutationFn: registerRequest,
		onSuccess: () => {
			// 	localStorage.setItem("role", roleRef.current.value)
			// 	setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />)
			console.log("You've created an user")
			queryClient.invalidateQueries(["login"])
		},
	})

	function handleLoginSubmit(e) {
		e.preventDefault()
		console.log('Refs check:', {
			username: usernameRef.current,
			password: passwordRef.current,
			role: roleRef.current
		});
		loginMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value
		})
	}

	function handleRegisterSubmit(e) {
		e.preventDefault()
		registerMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value
		})
	}
	return (
		<Container>
			{!isRegister ? (
				<LoginScreen handleLogin={handleLoginSubmit} setIsRegister={setIsRegister} usernameRef={usernameRef} passwordRef={passwordRef} roleRef={roleRef} />
			) : (
				<RegisterPopup handleRegister={handleRegisterSubmit} isRegister={isRegister} setIsRegister={setIsRegister}
					usernameRef={usernameRef} passwordRef={passwordRef} roleRef={roleRef} />
			)}

		</Container>
	)
}
