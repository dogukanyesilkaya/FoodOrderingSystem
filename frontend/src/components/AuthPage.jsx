import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState } from "react"
import { registerRequest, loginRequest } from "../api/authRequests"
import Restaurants from "./Restaurants"
import { Container, Form, Button, Alert, Row, Col, Modal } from "react-bootstrap";
import { AuthInput } from "./RestaurantFunctions";

export function AuthPage({ setCurrentPage }) {
	const [authOption, setAuthOption] = useState(null)

	const usernameRef = useRef()
	const passwordRef = useRef()
	const roleRef = useRef()

	const loginMutation = useMutation({
		mutationFn: loginRequest,
		onSuccess: () => {
			localStorage.setItem("role", roleRef.current.value)
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />)
		},
	})

	const registerMutation = useMutation({
		mutationFn: registerRequest,
		onSuccess: () => {
			localStorage.setItem("role", roleRef.current.value)
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />)
		},
	})

	function handleLoginSubmit(e) {
		e.preventDefault()
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
			<Button variant="primary" onClick={() => setAuthOption(true)}>
				Login</Button>;

			<Button variant="secondary" onClick={() => setAuthOption(false)}>
				Register</Button>;

			{authOption ? (
				console.log("authOption: true"),
				< AuthInput handleSubmit={handleLoginSubmit} usernameRef={usernameRef} passwordRef={passwordRef} roleRef={roleRef} />
			) :
				(

					console.log("authOption: false"),
					<Modal centered>
						<Modal.Header closeButton>Add User</Modal.Header>
						<Modal.Body>
							<AuthInput handleSubmit={handleRegisterSubmit} usernameRef={usernameRef} passwordRef={passwordRef} roleRef={roleRef} />
						</Modal.Body>
					</Modal>
				)}
		</Container>
	)
}
