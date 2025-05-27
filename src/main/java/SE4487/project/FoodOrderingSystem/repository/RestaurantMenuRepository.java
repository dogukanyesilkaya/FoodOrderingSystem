package SE4487.project.FoodOrderingSystem.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;

import SE4487.project.FoodOrderingSystem.model.RestaurantMenu;

public interface RestaurantMenuRepository extends JpaRepository<RestaurantMenu, Long> {

	@Query(value = """
			SELECT m.*
			FROM restaurant_menu m
			JOIN restaurant r ON m.restaurant_id = r.id
			WHERE r.name = ?1
			""", nativeQuery = true)
	List<RestaurantMenu> findByRestaurantName(String restName);

}
