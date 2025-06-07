import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useRef } from "react";
import { getRestaurantMenu } from "../api/userRequests"
import { addRestaurantMenu } from "../api/adminRequests"
import { Container, Form, Tab, Button, Modal, Row } from "react-bootstrap";
import { ListRestaurantMenu, RestaurantMenuSorting, ShowAddRestaurantMenuModal } from "./RestaurantFunctions";

export const MenuCategory = {
	NotSelected: "Not Selected",
	Burger: "Burger",
	Sandwich: "Sandwich",
	Kebap: "Kebap",
	Salad: "Salad",
	Other: "Other",
};

export default function RestaurantMenu({ setCurrentPage, restaurantId, restaurantName }) {
	const [modalShow, setModalShow] = useState(false);
	const [menuCategory, setMenuCategory] = useState(MenuCategory.NotSelected);


	const { status, error, data } = useQuery({
		queryKey: ["restaurantMenu", menuCategory],
		queryFn: () => getRestaurantMenu({ restaurantName, menuCategory }),
	})

	if (status.status === "loading") return <h1>Loading...</h1>
	if (status.status === "error") {
		return <h1>{JSON.stringify(error)}</h1>
	}


	return (
		<div>
			<ShowAddRestaurantMenuModal show={modalShow} onHide={() => setModalShow(false)} restaurantId={restaurantId} />
			<Row>
				<Container>
					<RestaurantMenuSorting setCategoryMenu={setMenuCategory} />
					<ListRestaurantMenu data={data} />
					<Button disabled={!(localStorage.getItem("role") == "ADMIN")} onClick={() => setModalShow(true)}>Add Menu Item</Button>
				</Container>
			</Row>
		</div>
	);
}
