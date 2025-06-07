import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { registerRequest, loginRequest } from "../api/authRequests";
import Restaurants from "./Restaurants";
import { Container, Button, Modal, Row, Col } from "react-bootstrap";
import { AuthInput } from "./RestaurantFunctions";
import './AuthPage.css';

export function AuthPage({ setCurrentPage }) {
	const [authOption, setAuthOption] = useState(null);

	const usernameRef = useRef();
	const passwordRef = useRef();
	const roleRef = useRef();

	const loginMutation = useMutation({
		mutationFn: loginRequest,
		onSuccess: () => {
			localStorage.setItem("role", roleRef.current.value);
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />);
		},
	});

	const registerMutation = useMutation({
		mutationFn: registerRequest,
		onSuccess: () => {
			localStorage.setItem("role", roleRef.current.value);
			setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />);
		},
	});

	function handleLoginSubmit(e) {
		e.preventDefault();
		loginMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value
		});
	}

	function handleRegisterSubmit(e) {
		e.preventDefault();
		registerMutation.mutate({
			name: usernameRef.current.value,
			password: passwordRef.current.value,
			role: roleRef.current.value
		});
	}

	return (
		<div className="auth-background">
			<Container className="auth-wrapper">
				<h2 className="text-center mb-4 text-white">Yemek Sipariş Sistemi</h2>
				<Row className="justify-content-center">
					<Col xs="auto">
						<Button variant="light" onClick={() => setAuthOption(true)} className="me-3 shadow">
							Giriş Yap
						</Button>
						<Button variant="outline-light" onClick={() => setAuthOption(false)} className="shadow">
							Kayıt Ol
						</Button>
					</Col>
				</Row>

				<Row className="justify-content-center mt-4">
					<Col xs={12} md={6}>
						{authOption === true && (
							<div className="glass-panel p-4 mt-3">
								<AuthInput
									handleSubmit={handleLoginSubmit}
									usernameRef={usernameRef}
									passwordRef={passwordRef}
									roleRef={roleRef}
								/>
							</div>
						)}

						{authOption === false && (
							<Modal centered show onHide={() => setAuthOption(null)} backdrop="static">
								<Modal.Header closeButton>
									<Modal.Title>Kullanıcı Kaydı</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<AuthInput
										handleSubmit={handleRegisterSubmit}
										usernameRef={usernameRef}
										passwordRef={passwordRef}
										roleRef={roleRef}
									/>
								</Modal.Body>
							</Modal>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
