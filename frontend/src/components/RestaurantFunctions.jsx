import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurants, getRestaurantMenu } from "../api/userRequests"
import { addRestaurant, addRestaurantMenu } from "../api/adminRequests"
import RestaurantMenu, { MenuCategory } from "./RestaurantMenu"
import { Container, Form, Button, Alert, Row, Col, Tab, Nav, Card, CardBody, Modal, ListGroup, Offcanvas, CardGroup } from "react-bootstrap";
import shoppingCart from "../assets/shoppingCart.jpg";
import Restaurants from "./Restaurants";

export function backToRestaurants({ setCurrentPage }) {
	//const restaurantPage = 
	setCurrentPage(<Restaurants setCurrentPage={setCurrentPage} />)
}
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

export function ShowShoppingCart({ items, setItems }) {
	const [show, setShow] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);

	const totalPrice = items.reduce((acc, item) => acc + Number(item.price), 0);

	function removeFromItems(itemId) {
		setItems(prevItems => prevItems.filter(item => item.id !== itemId));
	}
	function ConfirmationPopup() {
		return (
			<Modal show={isCompleted} onHide={() => setIsCompleted(false)} centered>

				<Modal.Header closeButton>Attention!</Modal.Header>
				<Modal.Body>
					<Alert>
						Your order is taken
					</Alert>
				</Modal.Body>
			</Modal>
		);
	}
	return (
		<>
			<ConfirmationPopup />
			<Button variant="primary" onClick={() => setShow(true)} className="me-2">
				Cart
			</Button>
			<Offcanvas show={show} onHide={() => setShow(false)} placement={'end'}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title> Shopping Cart</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					{items.length > 0 ? (
						items.map(item => (
							<Card key={item.id} className="mb-2">
								<Card.Header>
									<Button onClick={() => removeFromItems(item.id)}>
										remove
									</Button>
								</Card.Header>
								<Card.Body>
									<Card.Title>{item.name}</Card.Title>
									<Card.Text>{item.description}</Card.Text>
									<Card.Footer>{item.price} TL</Card.Footer>
								</Card.Body>
							</Card>
						))
					) : (
						<p>Your cart is empty</p>
					)}

					<Alert show={items > 0} variant="secondary">
						Total Cost: {totalPrice} TL
					</Alert>
					<Button variant="outline-secondary" onClick={() => setIsCompleted(true)} className="me-2">
						Give Order
					</Button>

				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}


export function ListRestaurants({ setCurrentPage, data }) {

	return (
		<CardGroup>
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
		</CardGroup>
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

	const [ratingValue, setRatingValue] = useState(5)
	const [deliveryTimeValue, setDeliveryTimeValue] = useState(45)

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
						<Form.Label>Rating: {ratingValue}</Form.Label>
						<Form.Range min="1" max="10" step="1" value={ratingValue} onChange={(e) => setRatingValue(e.target.value)}
							ref={ratingRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Delivery Time: {deliveryTimeValue} minutes</Form.Label>
						{/* <Form.Control type="text" ref={deliveryTimeRef} required /> */}
						<Form.Range min="5" max="120" step="5" value={deliveryTimeValue} onChange={(e) => setDeliveryTimeValue(e.target.value)}
							ref={deliveryTimeRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Region</Form.Label>
						<Form.Select ref={regionRef} required >
							<option value="Izmir">Select Region </option>
							<option value="Izmir">Izmir</option>
							<option value="Istanbul">Istanbul</option>
							<option value="Adana">Adana</option>
							<option value="Kars">Kars</option>
							<option value="Mugla">Mugla</option>
						</Form.Select>
					</Form.Group>


				</Form>

			</Modal.Body>

			<Modal.Footer>
				<Button onClick={handleSubmit}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
}

export function ListRestaurantMenu({ data, items, setItems }) {


	function addToItems(itemId) {
		// Find the item in data by id
		const itemToAdd = data.find(item => item.id === itemId);
		console.log("itemtoAdd: ", itemToAdd)
		console.log("itemtoAdd id: ", itemId)
		if (!itemToAdd) return;


		// Add the item if not already in items (optional)
		setItems(prevItems => {
			if (prevItems.some(item => item.id === itemId)) return prevItems;
			return [...prevItems, itemToAdd];
		});
	}

	console.log('Items:', items);
	return (
		<CardGroup>
			{data?.map(menu => (

				<Card key={menu.id} className="text-center" style={{ width: '18rem' }}>
					<Card.Header className="d-flex justify-content-end">
						<Button variant="link" className="p-0 border-0" style={{ padding: '2px' }}
							onClick={() => { addToItems(menu.id) }}>
							<img src={shoppingCart} alt="Button image" style={{ width: '30px', height: '30px' }} />
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
		</CardGroup>
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


	const [priceValue, setPriceValue] = useState(120)
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
						<Form.Label>Category</Form.Label>
						<Form.Select ref={categoryRef} required >
							<option value="Not Selected">Not Selected</option>
							<option value="Burger">Burger</option>
							<option value="Sandwich">Sandwich</option>
							<option value="Kebap">Kebap</option>
							<option value="Salad">Salad</option>
						</Form.Select>

					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" ref={descriptionRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Price: {priceValue} TL</Form.Label>
						<Form.Range min="20" max="1500" step="10" value={priceValue} onChange={(e) => setPriceValue(e.target.value)}
							ref={priceRef} required />

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
