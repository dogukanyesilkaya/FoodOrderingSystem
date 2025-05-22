package SE4487.project.FoodOrderingSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class RestaurantMenu {
	@Id
	private Long id;

	private Long restaurantId;

}
