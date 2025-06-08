package SE4487.project.FoodOrderingSystem.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
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

	private List<Restaurant> sortRestaurantsByRating(List<Restaurant> allRest) {

		Collections.sort(allRest, new Comparator<Restaurant>() {

			public int compare(Restaurant rest1, Restaurant rest2) {
				int rest1Rating = Integer.parseInt(rest1.getRating());
				int rest2Rating = Integer.parseInt(rest2.getRating());

				return Integer.compare(rest2Rating, rest1Rating);
			}
		});

		return allRest;
	}

	private List<Restaurant> sortRestaurantsByDeliveryTime(List<Restaurant> allRest) {
		Collections.sort(allRest, new Comparator<Restaurant>() {

			public int compare(Restaurant rest1, Restaurant rest2) {
				int rest1Rating = Integer.parseInt(rest1.getDeliveryTime());
				int rest2Rating = Integer.parseInt(rest2.getDeliveryTime());

				return Integer.compare(rest1Rating, rest2Rating);
			}
		});

		return allRest;
	}

	public List<Restaurant> getAllRestaurants() {
		return restaurantRepository.findAll();
	}

	public List<Restaurant> getRestaurantBySortingId(int id) {
		switch (id) {
			case 0:
				return restaurantRepository.findAllByOrderByNameAsc();
			case 1:
				return sortRestaurantsByRating(getAllRestaurants());
			case 2:
				return restaurantRepository.findAllByOrderByRegionAsc();
			case 3:
				return sortRestaurantsByDeliveryTime(getAllRestaurants());
			default:
				return restaurantRepository.findAll();
		}
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
