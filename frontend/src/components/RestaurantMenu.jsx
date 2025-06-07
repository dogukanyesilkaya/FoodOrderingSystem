import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import { getRestaurantMenu } from "../api/userRequests"
import { Container, Button, Row } from "react-bootstrap";
import { ListRestaurantMenu, RestaurantMenuSorting, ShowAddRestaurantMenuModal } from "./RestaurantFunctions";
import './RestaurantMenu.css'; // Yeni stil dosyası

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
		<div className="menu-page-background">
			<ShowAddRestaurantMenuModal show={modalShow} onHide={() => setModalShow(false)} restaurantId={restaurantId} />
			<Row>
				<Container>
					<RestaurantMenuSorting setCategoryMenu={setMenuCategory} />
					<ListRestaurantMenu data={data} />
					<Button className="add-item-button" disabled={!(localStorage.getItem("role") == "ADMIN")} onClick={() => setModalShow(true)}>
						Add Menu Item
					</Button>
				</Container>
			</Row>
		</div>
	);
}
