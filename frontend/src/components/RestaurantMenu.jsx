import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurantMenu } from "../api/userRequests"
import { addRestaurantMenu } from "../api/adminRequests"
import { Container, Form, Tab, Button, Modal } from "react-bootstrap";
import { ListRestaurantMenu, ShowAddRestaurantMenuModal } from "./RestaurantFunctions";


export default function RestaurantMenu({ setCurrentPage, restaurantId, restaurantName }) {
	const [modalShow, setModalShow] = useState(false);


	const { status, error, data } = useQuery({
		queryKey: ["restaurantMenu"],
		queryFn: () => getRestaurantMenu(restaurantName),
	})

	if (status.status === "loading") return <h1>Loading...</h1>
	if (status.status === "error") {
		return <h1>{JSON.stringify(error)}</h1>
	}

	return (
		<div>
			<Container>
				<ListRestaurantMenu data={data} />
				<Button disabled={!(localStorage.getItem("role") == "ADMIN")} onClick={() => setModalShow(true)}>Add Menu Item</Button>
				<ShowAddRestaurantMenuModal show={modalShow} onHide={() => setModalShow(false)} restaurantId={restaurantId} />

			</Container>
		</div>
	);
}
