package SE4487.project.FoodOrderingSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import SE4487.project.FoodOrderingSystem.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	List<Restaurant> findByRegion(String region);
}
