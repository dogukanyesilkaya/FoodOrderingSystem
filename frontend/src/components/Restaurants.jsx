import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurants } from "../api/userRequests"
import { addRestaurant } from "../api/adminRequests"
import RestaurantMenu from "./RestaurantMenu"
import { Container, Form, Button, Alert, Row, Col, Tab, Nav, Modal } from "react-bootstrap";
import { ListRestaurants, ShowAddRestaurantModal } from "./RestaurantFunctions";

export default function Restaurants({ setCurrentPage }) {

	const [modalShow, setModalShow] = useState(false);

	const { status, error, data } = useQuery({
		queryKey: ["restaurants"],
		queryFn: () => getRestaurants(),
	})

	if (status.status === "loading") return <h1>Loading...</h1>
	if (status.status === "error") {
		return <h1>{JSON.stringify(error)}</h1>
	}

	return (
		<Container>
			<ListRestaurants setCurrentPage={setCurrentPage} data={data} />
			<Button disabled={!(localStorage.getItem("role") == "ADMIN")} onClick={() => setModalShow(true)}>Add Restaurant</Button>
			<ShowAddRestaurantModal show={modalShow} onHide={() => setModalShow(false)} />
		</Container>

	);
}
