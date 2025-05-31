package SE4487.project.FoodOrderingSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import SE4487.project.FoodOrderingSystem.model.SystemUser;

public interface SystemUserRepository extends JpaRepository<SystemUser, Long> {

	SystemUser findByName(String username);
}
