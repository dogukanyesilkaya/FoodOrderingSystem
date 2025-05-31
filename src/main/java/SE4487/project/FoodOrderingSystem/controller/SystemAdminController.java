package SE4487.project.FoodOrderingSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import SE4487.project.FoodOrderingSystem.model.Restaurant;
import SE4487.project.FoodOrderingSystem.model.RestaurantMenu;
import SE4487.project.FoodOrderingSystem.service.FoodOrderingService;

@Controller
@RequestMapping("/admin")
public class SystemAdminController {
	@Autowired
	private FoodOrderingService foodOrderingService;

	@PostMapping("/restaurant")
	public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
		return foodOrderingService.saveRestaurant(restaurant);
	}

	@PostMapping("/menu")
	public ResponseEntity<RestaurantMenu> addRestaurantMenu(@RequestBody RestaurantMenu restaurantMenu) {
		return foodOrderingService.saveRestaurantMenu(restaurantMenu);
	}

}
