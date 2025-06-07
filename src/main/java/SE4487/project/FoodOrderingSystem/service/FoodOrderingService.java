package SE4487.project.FoodOrderingSystem.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import SE4487.project.FoodOrderingSystem.model.Restaurant;
import SE4487.project.FoodOrderingSystem.model.RestaurantMenu;
import SE4487.project.FoodOrderingSystem.repository.RestaurantMenuRepository;
import SE4487.project.FoodOrderingSystem.repository.RestaurantRepository;

@Service
public class FoodOrderingService {
	Logger logger = LoggerFactory.getLogger(FoodOrderingService.class);
	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private RestaurantMenuRepository restaurantMenuRepository;

	public List<Restaurant> getAllRestaurants() {
		return restaurantRepository.findAll();
	}

	public List<Restaurant> getRestaurantBySortingId(int id) {
		switch (id) {
			case 0:
				return restaurantRepository.findAllByOrderByNameDesc();
			case 1:
				return restaurantRepository.findAllByOrderByRatingDesc();
			case 2:
				return restaurantRepository.findAllByOrderByRegionDesc();
			case 3:
				return restaurantRepository.findAllByOrderByDeliveryTimeDesc();
			default:
				break;
		}
		return restaurantRepository.findAll();
	}

	public List<RestaurantMenu> getRestaurantMenuByNameAndCategory(String restName, String category) {
		if (category.equals("Not Selected")) {
			// logger.warn("restName : {}", category);
			return restaurantMenuRepository.findByRestaurantName(restName);
		}
		return restaurantMenuRepository.findByRestaurantNameAndCategory(restName, category);
	}

	public ResponseEntity<Restaurant> saveRestaurant(Restaurant restaurant) {
		Restaurant savedRestaurant = restaurantRepository.save(restaurant);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedRestaurant);
	}

	public ResponseEntity<RestaurantMenu> saveRestaurantMenu(RestaurantMenu restaurantMenu) {
		RestaurantMenu savedRestaurantMenu = restaurantMenuRepository.save(restaurantMenu);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedRestaurantMenu);
	}

}
