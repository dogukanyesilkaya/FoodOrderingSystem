import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef, useState, useEffect } from "react"
import { registerRequest, loginRequest } from "../api/authRequests"
import Restaurants from "./Restaurants"
import { Container, Form, Button, Alert, Row, Col, Modal } from "react-bootstrap";
import { LoginScreen, RegisterPopup } from "./RestaurantFunctions";
import './AuthPage.css';


export function AuthPage({ setCurrentPage }) {
	const [isRegister, setIsRegister] = useState(false);
	const [alertMessage, setAlertMessage] = useState("Please enter your info");

	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const roleRef = useRef(null);

	const queryClient = useQueryClient();
	const loginMutation = useMutation({
		mutationFn: loginRequest,
		mutationKey: ["login"],
		onSuccess: () => {
			localStorage.setItem("role", roleRef.current.value);
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />);
		},
		onError: (error) => {

		},
	});


	const registerMutation = useMutation({
		mutationFn: registerRequest,
		onSuccess: () => {
			queryClient.invalidateQueries(["login"]);
		},
		onError: (error) => {
			setAlertMessage("Registration failed. Please try again.");
		},
	});

	function handleLoginSubmit(e) {
		e.preventDefault();
		loginMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value,
		});
	}

	function handleRegisterSubmit(e) {
		e.preventDefault();
		const usernameText = usernameRef.current.value;
		if (usernameText.length < 3 || usernameText.length >= 15) {
			return;
		}
		const passwordText = passwordRef.current.value;
		if (passwordText.length < 3 || passwordText.length >= 15) {
			return;
		}

		registerMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value,
		});

	}

	return (
		<Container className="auth-page">
			<Row className="justify-content-center">

				{!isRegister ? (
					<LoginScreen
						handleLogin={handleLoginSubmit}
						setIsRegister={setIsRegister}
						usernameRef={usernameRef}
						passwordRef={passwordRef}
						roleRef={roleRef}
						alertMessage={"Please enter your info"}
					/>
				) : (
					<RegisterPopup
						handleRegister={handleRegisterSubmit}
						isRegister={isRegister}
						setIsRegister={setIsRegister}
						usernameRef={usernameRef}
						passwordRef={passwordRef}
						roleRef={roleRef}
					/>

				)}
			</Row>
		</Container>
	);
}
