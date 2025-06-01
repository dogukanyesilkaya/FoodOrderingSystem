package SE4487.project.FoodOrderingSystem.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import SE4487.project.FoodOrderingSystem.service.auth.SystemUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityHttpFilter {

	@Autowired
	private SystemUserDetailsService userDetails;

	@Autowired
	private JWTFilter jwtFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrfCustomizer -> csrfCustomizer.disable());
		http.authorizeHttpRequests(auth -> auth
				.requestMatchers("/admin/**").hasAuthority("ADMIN") // Only for ADMIN authority
				.requestMatchers("/user/**").hasAnyAuthority("USER", "ADMIN") // USER or ADMIN
				.requestMatchers("/auth/**").permitAll() // No auth required
				.anyRequest().authenticated() // All others must be authenticated
		);
		// http.formLogin(Customizer.withDefaults());
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		http.httpBasic(Customizer.withDefaults());
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();

	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
		authProvider.setUserDetailsService(userDetails);
		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception {
		return authConfiguration.getAuthenticationManager();
	}
}
