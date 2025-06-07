import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { getRestaurants } from "../api/userRequests"
import { Container, Row, Col, Button } from "react-bootstrap";
import { ListRestaurants, RestaurantSorting, ShowAddRestaurantModal } from "./RestaurantFunctions";
import './Restaurants.css';

export default function Restaurants({ setCurrentPage }) {

	const [modalShow, setModalShow] = useState(false);
	const [restaurantSortId, setRestaurantSortId] = useState(0);

	const { status, error, data } = useQuery({
		queryKey: ["restaurants", restaurantSortId],
		queryFn: () => getRestaurants({ restaurantSortId }),
	})

	if (status.status === "loading") return <h1>Loading...</h1>
	if (status.status === "error") {
		return <h1>{JSON.stringify(error)}</h1>
	}

	return (
		<div className="restaurants-page-background">
			<Container>
				<ShowAddRestaurantModal show={modalShow} onHide={() => setModalShow(false)} />
				<Row>
					<Col>
						<RestaurantSorting setRestaurantId={setRestaurantSortId} />
						<Button className="add-restaurant-button" disabled={!(localStorage.getItem("role") == "ADMIN")} onClick={() => setModalShow(true)}>
							Add Restaurant
						</Button>
					</Col>
					<Col>
						<ListRestaurants setCurrentPage={setCurrentPage} data={data} />
					</Col>
				</Row>
			</Container>
		</div>
	);
}
