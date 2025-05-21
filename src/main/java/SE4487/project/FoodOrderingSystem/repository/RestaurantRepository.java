package SE4487.project.FoodOrderingSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import SE4487.project.FoodOrderingSystem.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
