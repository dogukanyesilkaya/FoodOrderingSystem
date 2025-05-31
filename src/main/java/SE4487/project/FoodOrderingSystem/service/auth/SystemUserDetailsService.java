package SE4487.project.FoodOrderingSystem.service.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import SE4487.project.FoodOrderingSystem.model.SystemUser;
import SE4487.project.FoodOrderingSystem.repository.SystemUserRepository;

@Service
public class SystemUserDetailsService implements UserDetailsService {

	@Autowired
	private SystemUserRepository userRepository;

	@Override
	public SystemUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		SystemUser userFromDatabase = userRepository.findByName(username);
		if (userFromDatabase == null) {
			throw new UsernameNotFoundException(username);
		}
		return new SystemUserDetails(userFromDatabase);
	}

}
