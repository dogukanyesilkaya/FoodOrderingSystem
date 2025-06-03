import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { registerRequest, loginRequest } from "../api/authRequests"
import Restaurants from "./Restaurants"
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

export function AuthPage({ setCurrentPage }) {
	const usernameRef = useRef()
	const passwordRef = useRef()
	const roleRef = useRef()

	const authMutation = useMutation({
		mutationFn: loginRequest,
		onSuccess: () => {
			console.log("onSucess | AuthPage")
			localStorage.setItem("role", roleRef.current.value)
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />)
		},
	})

	function handleSubmit(e) {
		e.preventDefault()
		authMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value
		})
	}

	return (
		<Container className="align-items-center" style={{ height: '100vh' }}>
			{authMutation.isError && JSON.stringify(authMutation.error)}
			<Row>
				<Form onSubmit={handleSubmit} className="w-100" >
					<Form.Group className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" ref={usernameRef} required />
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} required />
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Select ref={roleRef} >
							<option value="USER">USER</option>
							<option value="ADMIN">ADMIN</option>
						</Form.Select>
					</Form.Group>
					<Button type="submit" className="mb-3">
						Login
					</Button>
				</Form>
			</Row>

			<Row>
				<Alert variant="success">Please Enter Your Info</Alert>
			</Row>
		</Container>
	)
}
