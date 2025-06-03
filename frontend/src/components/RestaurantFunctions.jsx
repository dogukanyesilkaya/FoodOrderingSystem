import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurants, getRestaurantMenu } from "../api/userRequests"
import { addRestaurant, addRestaurantMenu } from "../api/adminRequests"
import RestaurantMenu from "./RestaurantMenu"
import { Container, Form, Button, Alert, Row, Col, Tab, Nav, Card, CardBody, Modal } from "react-bootstrap";

export function ListRestaurants({ setCurrentPage, data }) {

	return (
		<div>
			{data?.map((restaurant) => (

				<Card key={restaurant.id}>
					<Card.Body>
						<Card.Title>{restaurant.name}</Card.Title>
						<Card.Text>{restaurant.rating}</Card.Text>
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

	return (
		<div>
			{data?.map((menu) => (

				<Card key={menu.id}>
					<Card.Body>
						<Card.Title>{menu.name}</Card.Title>
						<Card.Text>{menu.category}</Card.Text>
						<Card.Text>{menu.description}</Card.Text>
						<Card.Text>{menu.price}</Card.Text>
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
