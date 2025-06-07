package SE4487.project.FoodOrderingSystem.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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
		// Create authentication token with role as details
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.getName(),
				user.getPassword());

		// Add role information as details
		Map<String, Object> details = new HashMap<>();
		details.put("role", user.getRole());
		authToken.setDetails(details);

		try {
			Authentication authentication = authManager.authenticate(authToken);
			if (authentication.isAuthenticated()) {
				return jwtService.generateToken(user);
			}
		} catch (AuthenticationException e) {
			return "fail";
		}

		return "fail";
	}

}
