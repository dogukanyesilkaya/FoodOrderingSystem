package SE4487.project.FoodOrderingSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import SE4487.project.FoodOrderingSystem.model.Restaurant;
import SE4487.project.FoodOrderingSystem.model.RestaurantMenu;
import SE4487.project.FoodOrderingSystem.service.FoodOrderingService;

@Controller
@RequestMapping("/")
public class FoodOrderingController {
	@Autowired
	private FoodOrderingService foodOrderingService;

	@GetMapping("restaurant")
	@ResponseBody
	public List<Restaurant> getAllRestaurants() {
		return foodOrderingService.getAllRestaurants();
	}

	@GetMapping("restaurant/{region}")
	@ResponseBody
	public List<Restaurant> getRestaurantsByRegion(@PathVariable String region) {
		return foodOrderingService.getRestaurantsByRegion(region);
	}

	@PostMapping("restaurant")
	public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
		return foodOrderingService.saveRestaurant(restaurant);
	}

	@GetMapping("menu/{restaurantName}")
	@ResponseBody
	public List<RestaurantMenu> getRestaurantMenu(@PathVariable String restaurantName) {
		return foodOrderingService.getRestaurantMenuByName(restaurantName);

	}

	@PostMapping("menu")
	public ResponseEntity<RestaurantMenu> addRestaurantMenu(@RequestBody RestaurantMenu restaurantMenu) {
		return foodOrderingService.saveRestaurantMenu(restaurantMenu);
	}

}
