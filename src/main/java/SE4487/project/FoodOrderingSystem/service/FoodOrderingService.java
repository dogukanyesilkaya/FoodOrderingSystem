package SE4487.project.FoodOrderingSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import SE4487.project.FoodOrderingSystem.model.Restaurant;
import SE4487.project.FoodOrderingSystem.repository.RestaurantRepository;

@Service
public class FoodOrderingService {
	@Autowired
	private RestaurantRepository restaurantRepository;

	public List<Restaurant> getAllRestaurants() {
		return restaurantRepository.findAll();
	}

	public List<Restaurant> getRestaurantsByRegion(String region) {
		return restaurantRepository.findByRegion(region);
	}

	public ResponseEntity<Restaurant> saveRestaurant(Restaurant restaurant) {
		return ResponseEntity.status(HttpStatus.CREATED).body(restaurant);
	}

}
