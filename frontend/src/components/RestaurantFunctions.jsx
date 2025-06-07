import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurants, getRestaurantMenu } from "../api/userRequests"
import { addRestaurant, addRestaurantMenu } from "../api/adminRequests"
import RestaurantMenu, { MenuCategory } from "./RestaurantMenu"
import { Container, Form, Button, Alert, Row, Col, Tab, Nav, Card, CardBody, Modal, ListGroup } from "react-bootstrap";
import shoppingCart from "../assets/shoppingCart.jpg";

export function LoginScreen({ handleLogin, setIsRegister, usernameRef, passwordRef, roleRef }) {
	console.log('LoginScreen received refs:', { usernameRef, passwordRef, roleRef });
	return (
		<Container className="align-items-center" style={{ height: '100vh' }}>
			<Row>
				<Form onSubmit={handleLogin} className="w-100" >
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
					<Button type="submit" variant="primary" className="mb-3 me-2">
						Login
					</Button>
					<Button className="mb-3" variant="outline-secondary" onClick={() => setIsRegister(true)}>
						Register
					</Button>
				</Form>
			</Row>

			<Row>
				<Alert variant="success">Please Enter Your Info</Alert>
			</Row>
		</Container>

	);
}

export function RegisterPopup({ handleRegister, isRegister, setIsRegister, usernameRef, passwordRef, roleRef }) {
	return (
		<Modal centered show={isRegister} onHide={() => setIsRegister(false)}>
			<Modal.Header closeButton>Add User</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleRegister} className="w-100" id="registerForm">
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
				</Form>

			</Modal.Body>
			<Modal.Footer >
				<Button type="submit" className="mb-3" form="registerForm">
					Register
				</Button>
			</Modal.Footer>
		</Modal >
	);
}


export function ListRestaurants({ setCurrentPage, data }) {

	return (
		<div>
			{data?.map((restaurant) => (

				<Card key={restaurant.id}>
					<Card.Body>
						<Card.Title>{restaurant.name}</Card.Title>
						<Card.Text>{restaurant.rating}/10</Card.Text>
						<Card.Text>{restaurant.deliveryTime} minutes</Card.Text>
						<Card.Text>{restaurant.region}</Card.Text>
						<Button onClick={() => {
							setCurrentPage(<RestaurantMenu
								setCurrentPage={setCurrentPage} restaurantName={restaurant.name} restaurantId={restaurant.id} />)
						}}
						>Select</Button>
					</Card.Body>
				</Card>

			))
			}
		</div>
	);
}

export function ShowAddRestaurantModal(props) {
	const queryClient = useQueryClient()
	const addRestaurantMutation = useMutation({
		mutationFn: addRestaurant,
		onSuccess: () => {
			console.log("onSucess | AddRestaurant")
			queryClient.invalidateQueries(["restaurants"], { exact: true })
		},
	})

	const deliveryTimeRef = useRef()
	const nameRef = useRef()
	const ratingRef = useRef()
	const regionRef = useRef()

	function handleSubmit(e) {
		e.preventDefault()
		console.log("form submitted")
		addRestaurantMutation.mutate({
			deliveryTime: deliveryTimeRef.current.value,
			name: nameRef.current.value,
			rating: ratingRef.current.value,
			region: regionRef.current.value,
		})
	}

	return (
		<Modal
			{...props} centered>
			<Modal.Header closeButton>Add Restaurant</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" ref={nameRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>rating</Form.Label>
						<Form.Control type="text" ref={ratingRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Delivery Time</Form.Label>
						<Form.Control type="text" ref={deliveryTimeRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Region</Form.Label>
						<Form.Control type="text" ref={regionRef} required />
					</Form.Group>


				</Form>

			</Modal.Body>

			<Modal.Footer>
				<Button onClick={handleSubmit}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
}

export function ListRestaurantMenu({ data }) {

	console.log("Data: ", data)
	return (
		<div>
			{data?.map((menu) => (

				<Card key={menu.id} className="text-center" style={{ width: '18rem' }}>
					<Card.Header className="d-flex justify-content-end">
						<Button >
							<Button variant="link" className="p-0 border-0" style={{ padding: '2px' }}>
								<img src={shoppingCart} alt="Button image" style={{ width: '30px', height: '30px' }} />
							</Button>
						</Button>
					</Card.Header>
					<Card.Body>
						<Card.Title>{menu.name}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{menu.category}</Card.Subtitle>
						<Card.Text>{menu.description}</Card.Text>
						<Card.Footer className="text-muted">{menu.price} TL</Card.Footer>
					</Card.Body>
				</Card>

			))
			}
		</div>
	);
}

export function ShowAddRestaurantMenuModal(props) {
	const { restaurantId, ...modalProps } = props;
	const queryClient = useQueryClient()
	const addRestaurantMenuMutation = useMutation({
		mutationFn: addRestaurantMenu,
		onSuccess: () => {
			console.log("onSucess | AddRestaurantMenu")
			queryClient.invalidateQueries(["restaurantMenu"], { exact: true })
		},
	})

	const nameRef = useRef()
	const categoryRef = useRef()
	const descriptionRef = useRef()
	const priceRef = useRef()

	function handleSubmit(e) {
		e.preventDefault()
		console.log("form submitted")
		addRestaurantMenuMutation.mutate({
			category: categoryRef.current.value,
			description: descriptionRef.current.value,
			name: nameRef.current.value,
			price: priceRef.current.value,
			restaurantId: restaurantId,
		})
	}

	return (
		<Modal
			{...modalProps} centered>
			<Modal.Header closeButton>Add Restaurant</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" ref={nameRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>category</Form.Label>
						<Form.Control type="text" ref={categoryRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" ref={descriptionRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Price</Form.Label>
						<Form.Control type="text" ref={priceRef} required />
					</Form.Group>

				</Form>

			</Modal.Body>

			<Modal.Footer>
				<Button onClick={handleSubmit}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
}

export function RestaurantSorting({ setRestaurantId }) {

	const handleRestaurantId = (id) => {
		setRestaurantId(id)
	}

	return (
		<Tab.Container id="list-group-tabs-example" defaultActiveKey="#alphabetically">
			<ListGroup>
				<ListGroup.Item action href="#alphabetically" onClick={() => handleRestaurantId(0)}>
					Sort alphabetically
				</ListGroup.Item>
				<ListGroup.Item action href="#rating" onClick={() => handleRestaurantId(1)}>
					Sort by rating
				</ListGroup.Item>
				<ListGroup.Item action href="#region" onClick={() => handleRestaurantId(2)}>
					Sort by region
				</ListGroup.Item>
				<ListGroup.Item action href="#time" onClick={() => handleRestaurantId(3)}>
					Sort by estimated delivery time
				</ListGroup.Item>

			</ListGroup>
		</Tab.Container>
	);
}

export function RestaurantMenuSorting({ setCategoryMenu }) {

	const handleCategoryMenu = (event) => {
		const category = event.target.value;
		setCategoryMenu(category)
	}

	return (
		<Form>
			<Form.Group className="mb-3">
				<Form.Select onChange={handleCategoryMenu}>
					<option value={MenuCategory.NotSelected}>Not Selected</option>
					<option value={MenuCategory.Burger}>Burger</option>
					<option value={MenuCategory.Sandwich}>Sandwich</option>
					<option value={MenuCategory.Kebap}>Kebap</option>
					<option value={MenuCategory.Salad}>Salad</option>
				</Form.Select>
			</Form.Group>
		</Form>
	);
}
