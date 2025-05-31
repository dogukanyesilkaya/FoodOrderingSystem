package SE4487.project.FoodOrderingSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import SE4487.project.FoodOrderingSystem.model.SystemUser;
import SE4487.project.FoodOrderingSystem.repository.SystemUserRepository;
import SE4487.project.FoodOrderingSystem.service.auth.JWTService;

@Service
public class UserService {

	@Autowired
	private SystemUserRepository userRepository;

	@Autowired
	private JWTService jwtService;

	@Autowired
	private AuthenticationManager authManager;

	public String register(SystemUser user) {
		userRepository.save(user);
		return jwtService.generateToken(user);
	}

	public String verify(SystemUser user) {
		Authentication authentication = authManager
				.authenticate(new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword()));

		if (authentication.isAuthenticated()) {
			return jwtService.generateToken(user);
		}

		return "fail";
	}

}
