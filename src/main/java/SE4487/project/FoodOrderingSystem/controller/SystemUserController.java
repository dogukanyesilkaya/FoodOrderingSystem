package SE4487.project.FoodOrderingSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import SE4487.project.FoodOrderingSystem.model.Restaurant;
import SE4487.project.FoodOrderingSystem.model.RestaurantMenu;
import SE4487.project.FoodOrderingSystem.service.FoodOrderingService;

@Controller
@RequestMapping("/user")
public class SystemUserController {
	@Autowired
	private FoodOrderingService foodOrderingService;

	@GetMapping("/restaurant")
	@ResponseBody
	public List<Restaurant> getAllRestaurants() {
		return foodOrderingService.getAllRestaurants();
	}

	@GetMapping("/restaurant/{region}")
	@ResponseBody
	public List<Restaurant> getRestaurantsByRegion(@PathVariable String region) {
		return foodOrderingService.getRestaurantsByRegion(region);
	}

	@GetMapping("/menu")
	@ResponseBody
	public List<RestaurantMenu> getRestaurantMenu(@RequestParam(name = "id", required = true) String restaurantName) {
		return foodOrderingService.getRestaurantMenuByName(restaurantName);

	}

}
