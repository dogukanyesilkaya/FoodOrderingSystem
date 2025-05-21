package SE4487.project.FoodOrderingSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import SE4487.project.FoodOrderingSystem.model.Restaurant;
import SE4487.project.FoodOrderingSystem.repository.RestaurantRepository;

@Controller
@RequestMapping("/")
public class FoodOrderingController {
	@Autowired
	private RestaurantRepository restaurantRepository;

	@GetMapping("restaurant/all")
	public List<Restaurant> getAllRestaurants() {

		return restaurantRepository.findAll();
	}
}
