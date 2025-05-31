package SE4487.project.FoodOrderingSystem.service.auth;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import SE4487.project.FoodOrderingSystem.model.SystemUser;

public class SystemUserDetails implements UserDetails {

	SystemUser userFromDatabase;

	public SystemUserDetails(SystemUser user) {
		userFromDatabase = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singleton(new SimpleGrantedAuthority(userFromDatabase.getRole()));
	}

	@Override
	public String getPassword() {
		return userFromDatabase.getPassword();
	}

	@Override
	public String getUsername() {
		return userFromDatabase.getName();
	}

}
