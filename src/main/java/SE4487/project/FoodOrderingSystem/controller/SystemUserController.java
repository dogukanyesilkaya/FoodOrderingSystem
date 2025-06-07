package SE4487.project.FoodOrderingSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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
	public List<Restaurant> getRestaurantBySortingId(
			@RequestParam(name = "sortId", required = true) int restaurantSortId) {
		return foodOrderingService.getRestaurantBySortingId(restaurantSortId);
	}

	@GetMapping("/menu")
	@ResponseBody
	public List<RestaurantMenu> getRestaurantMenu(
			@RequestParam(name = "id", required = true) String restaurantName,
			@RequestParam(name = "category", required = true) String category) {
		return foodOrderingService.getRestaurantMenuByNameAndCategory(restaurantName, category);

	}

}
