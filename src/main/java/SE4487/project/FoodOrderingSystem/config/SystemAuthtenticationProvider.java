package SE4487.project.FoodOrderingSystem.config;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import SE4487.project.FoodOrderingSystem.model.SystemUser;
import SE4487.project.FoodOrderingSystem.repository.SystemUserRepository;

@Component
public class SystemAuthtenticationProvider implements AuthenticationProvider {

	@Autowired
	private SystemUserRepository userRepository;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();

		// Get additional details (role) from authentication
		Object details = authentication.getDetails();
		String expectedRole = null;

		if (details instanceof Map) {
			expectedRole = (String) ((Map<?, ?>) details).get("role");
		}

		// Find user in database
		SystemUser user;
		user = userRepository.findByName(username);

		// Validate password
		if (!password.equals(user.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}

		// Validate role if provided
		if (expectedRole != null && !expectedRole.equals(user.getRole())) {
			throw new BadCredentialsException("Invalid role");
		}

		// Create authorities based on user role
		List<GrantedAuthority> authorities = Arrays.asList(
				new SimpleGrantedAuthority(user.getRole()));

		return new UsernamePasswordAuthenticationToken(username, password, authorities);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	}

}
